import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const humanizeText = async (text: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are an expert academic writer. Rewrite the provided text to make it sound strictly human-written, natural, and professional, avoiding any AI-like phrasing.\n\nCRITICAL CONSTRAINTS:\n1. Do not change the original context or meaning of the text.\n2. The format must remain exactly the same as the input (keep all exact side headings, bullet points, spacing, and markdown formatting).\n3. The final output MUST be within +/- 30 words of the original input text\'s word count.\n4. Output ONLY the rewritten text. Do not include any options, suggestions, introductory phrases, or concluding remarks.' },
      { role: 'user', content: text }
    ],
  });
  return response.choices[0].message.content;
};

export const summarizePDF = async (text: string) => {
  const prompt = 'Summarize the following academic text comprehensively so that everything in the document is covered. The final summarization MUST be strictly one or two paragraphs long.\n\nText:\n';
  return await processGemini(prompt, text);
};

export const askAI = async (query: string, context: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are the Second Brain AI. Use the provided context from the user\'s notes to answer their question accurately.' },
      { role: 'user', content: `Context: ${context}\n\nQuestion: ${query}` }
    ],
  });
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const processGemini = async (prompt: string, text: string): Promise<string> => {
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
  if (!OPENROUTER_API_KEY) throw new Error("Missing OPENROUTER_API_KEY in backend environment");

  try {
    const response = await openrouter.chat.completions.create({
      model: 'google/gemini-2.0-flash-lite-001', // High-performance model via OpenRouter
      messages: [
        { role: 'user', content: prompt + text }
      ],
    });

    return response.choices[0]?.message?.content ?? 'No response received.';
  } catch (error: any) {
    console.error("OpenRouter Error:", error);
    throw new Error(error.message || "AI processing failed via OpenRouter");
  }
};
