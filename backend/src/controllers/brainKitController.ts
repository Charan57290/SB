import { Request, Response } from 'express';
import { humanizeText, summarizePDF } from '../services/aiService';
const pdfParse = require('pdf-parse');

export const humanize = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Text is required' });
    
    const result = await humanizeText(text);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: 'AI processing failed', error });
  }
};

export const summarize = async (req: Request, res: Response) => {
  try {
    let textToSummarize = req.body.text;

    if (req.file) {
      const pdfData = await pdfParse(req.file.buffer);
      textToSummarize = pdfData.text;
    }

    if (!textToSummarize) {
      return res.status(400).json({ message: 'Text or PDF file is required' });
    }
    
    const result = await summarizePDF(textToSummarize);
    res.json({ result });
  } catch (error) {
    console.error("PDF SUMMARIZATION ERROR:", error);
    res.status(500).json({ message: 'AI Summarization failed', error });
  }
};

export const generateContent = async (req: Request, res: Response) => {
  try {
    const { prompt, text } = req.body;
    if (!prompt || !text) return res.status(400).json({ message: 'Prompt and text are required' });
    
    // Import processGemini if not imported at top
    const { processGemini } = require('../services/aiService');
    const result = await processGemini(prompt, text);
    res.json({ result });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Gemini processing failed', error });
  }
};

export const generateFlashcards = async (req: Request, res: Response) => {
  try {
    const { topic, existingQuestions, format } = req.body;
    if (!topic) return res.status(400).json({ message: 'Topic is required' });

    let avoidPrompt = '';
    if (existingQuestions && Array.isArray(existingQuestions) && existingQuestions.length > 0) {
      avoidPrompt = `\nCRITICAL: Do NOT include any of the following questions or variations of them. They have already been generated:\n${existingQuestions.map(q => `- ${q}`).join('\n')}\n`;
    }

    let prompt = '';
    if (format === 'mcq') {
      prompt = `You are an expert educator. Generate exactly 10 high-quality multiple choice flashcards about the topic: "${topic}". 
The flashcards should cover key concepts, definitions, and important facts. Make them challenging but educational.
${avoidPrompt}
Return the result strictly as a valid JSON array of objects. Each object must have a "q" (question) string, an "options" array containing exactly 4 strings (possible answers), and an "a" (answer) string which is the exact correct option. 
DO NOT include markdown formatting like \`\`\`json, just the raw array. Example: [{"q": "What is X?", "options": ["A", "B", "C", "D"], "a": "B"}]`;
    } else {
      prompt = `You are an expert educator. Generate exactly 10 high-quality flashcards about the topic: "${topic}". 
The flashcards should cover key concepts, definitions, and important facts. Make them challenging but educational.
${avoidPrompt}
Return the result strictly as a valid JSON array of objects. Each object must have a "q" (question) string and an "a" (answer) string. 
DO NOT include markdown formatting like \`\`\`json, just the raw array. Example: [{"q": "What is X?", "a": "X is Y."}]`;
    }

    const { processGemini } = require('../services/aiService');
    const aiRes = await processGemini(prompt, '');
    
    let cards = [];
    try {
      const cleaned = aiRes.replace(/```json/g, '').replace(/```/g, '').trim();
      cards = JSON.parse(cleaned);
      if (!Array.isArray(cards)) throw new Error('Not an array');
    } catch (parseError) {
      console.error("Failed to parse flashcards JSON:", aiRes);
      return res.status(500).json({ message: 'AI returned invalid format', raw: aiRes });
    }

    res.json({ cards });
  } catch (error: any) {
    console.error("FLASHCARD ERROR:", error);
    res.status(500).json({ message: error.message || 'Failed to generate flashcards' });
  }
};

export const generateCitations = async (req: Request, res: Response) => {
  try {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ message: 'Topic is required' });

    const response = await fetch(`https://api.openalex.org/works?search=${encodeURIComponent(topic)}&per-page=5`);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const items = data.results || [];

    if (items.length === 0) {
      return res.json({ message: "No research papers found for this topic. Please try a different or broader search term." });
    }

    const citations = items.map((item: any) => {
      let abstract = 'No abstract available for this paper.';
      if (item.abstract_inverted_index) {
        const wordIndex: string[] = [];
        for (const [word, positions] of Object.entries(item.abstract_inverted_index)) {
          for (const pos of (positions as number[])) {
            wordIndex[pos] = word;
          }
        }
        abstract = wordIndex.join(' ');
      }

      return {
        title: item.title || 'Unknown Title',
        authors: item.authorships?.map((a: any) => a.author.display_name).join(', ') || 'Unknown Authors',
        year: item.publication_year?.toString() || 'Unknown Year',
        summary: abstract.slice(0, 200) + '...',
        url: item.doi || item.id
      };
    });

    res.json({ citations });
  } catch (error: any) {
    console.error("CITATION ERROR:", error);
    res.status(500).json({ message: error.message || 'Failed to fetch citations' });
  }
};
