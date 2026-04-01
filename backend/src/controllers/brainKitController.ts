import { Request, Response } from 'express';
import { humanizeText, summarizePDF } from '../services/aiService';

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
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Text is required' });
    
    const result = await summarizePDF(text);
    res.json({ result });
  } catch (error) {
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
