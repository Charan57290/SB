import { Request, Response } from 'express';
import prisma from '../config/db';
import { processGemini } from '../services/aiService';

export const askAssistant = async (req: Request, res: Response) => {
  try {
    const { query, userId } = req.body;
    
    let finalUserId = String(userId);
    if (finalUserId.includes('@')) {
      const userObj = await prisma.user.findUnique({ where: { email: finalUserId } });
      if (userObj) {
        finalUserId = userObj.id;
      } else {
        return res.json({ result: "I could not authenticate your context." });
      }
    } else if (!userId || userId === 'undefined') {
       return res.json({ result: "Please log in to query your second brain." });
    }

    // Construct robust context
    let contextBuilder = "--- USER SECOND BRAIN KNOWLEDGE DATA ---\n\n";

    // 1. Fetch User Notes
    const notes = await prisma.note.findMany({
      where: { userId: finalUserId },
      select: { title: true, content: true }
    });
    
    if (notes.length > 0) {
        contextBuilder += "### NOTES:\n";
        notes.forEach(n => {
            // Very roughly strip html out of tiptap content for better context
            const strippedContent = n.content.replace(/<[^>]*>?/gm, '');
            contextBuilder += `- Title: ${n.title}\n  Content: ${strippedContent}\n\n`;
        });
    }

    // 2. Fetch User Storage Documents & Extracted text
    const docs = await prisma.document.findMany({
      where: { userId: finalUserId },
      select: { title: true, extractedText: true }
    });

    if (docs.length > 0) {
        contextBuilder += "### UPLOADED STORAGE DOCUMENTS:\n";
        docs.forEach(d => {
            contextBuilder += `- Document Name: ${d.title}\n  Text Context: ${d.extractedText ? d.extractedText.substring(0, 5000) : 'No readable text'}\n\n`; // Trim huge documents slightly to avert token caps
        });
    }

    const promptTemplate = `
You are the ultimate omniscient digital brain assistant for the user's "Second Brain" workspace.
Below is the user's current knowledge data. Use this as your primary context.

CRITICAL INSTRUCTIONS for answering:
1. Pay close attention to what the user is asking. If the user explicitly asks "what do I have in my notes about X" or "what did I write about X", you MUST strictly search their notes and answer ONLY based on what they have written. Do not hallucinate or add external knowledge in this case.
2. If the user asks a general question like "explain X to me" or "how does X work", first reference their notes if relevant, but then go significantly BEYOND the notes to provide a comprehensive, expert-level answer using your vast internal knowledge.
3. Always be professional, highly detailed, and insightful.

${contextBuilder}

Prompt: `;

    const result = await processGemini(promptTemplate, query);
    res.json({ result });

  } catch (error) {
    console.error("AI ASSISTANT ERROR:", error);
    res.status(500).json({ error: 'Failed to process intelligence request' });
  }
};
