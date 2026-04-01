import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'Summarize the following academic text into key findings, methodology, and a concise conclusion.' },
      { role: 'user', content: text }
    ],
  });
  return response.choices[0].message.content;
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

export const processGemini = async (prompt: string, text: string, retries = 2): Promise<string> => {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) throw new Error("Missing GEMINI_API_KEY in backend environment");

  await delay(3000); // Wait 3 seconds to avoid frequent rate-limits

  for (let i = 0; i < retries; i++) {
    if (i > 0) {
      console.warn("Rate limit hit. Retrying after 20 seconds...");
      await delay(20000);
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt + text }] }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errMsg = data?.error?.message ?? `HTTP ${response.status}`;
      // If we hit the rate limit (429) and have retries left, simply continue the loop
      // The 20-second delay will happen at the start of the next iteration
      if (response.status === 429 && i < retries - 1) {
        continue;
      }
      throw new Error(errMsg);
    }

    // Note: Gemini REST API returns data.candidates[0].content.parts[0].text
    // The structure `choices[0].message.content` belongs to OpenAI (or Gemini's OpenAI compatibility endpoint).
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response received.';
  }
  
  throw new Error("Failed after retries");
};
