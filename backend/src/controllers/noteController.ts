import { Request, Response } from 'express';
import prisma from '../config/db';
import { processGemini } from '../services/aiService';

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content, userId, tags } = req.body;
    
    // Validate if the user actually exists in the SQLite DB to prevent Foreign Key errors
    let validUserId = null;
    if (userId) {
      let userExists = await prisma.user.findUnique({ where: { id: String(userId) } });
      if (!userExists && String(userId).includes('@')) {
        userExists = await prisma.user.findUnique({ where: { email: String(userId) } });
      }
      if (userExists) validUserId = userExists.id;
    }

    const note = await prisma.note.create({
      data: {
        title: title || 'Untitled Note',
        content: content || '',
        userId: validUserId,
      }
    });

    // Simple tag handling if provided
    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        await prisma.tag.create({
          data: { name: tag.name || tag, noteId: note.id }
        });
      }
    }

    res.status(201).json(note);
  } catch (error) {
    console.error("CREATE NOTE ERROR:", error);
    res.status(500).json({ error: 'Failed to create note' });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const cleanUserId = (userId === 'undefined' || !userId) ? undefined : String(userId);
    
    // In dev mode, if the UI sends undefined userId, we can just return all notes.
    // If they strictly provide an ID, filter by it OR allow notes with null userId (so they don't lose dev testing notes).
    if (!cleanUserId) {
      return res.json([]);
    }

    let finalUserId = cleanUserId;
    if (cleanUserId.includes('@')) {
      const userObj = await prisma.user.findUnique({ where: { email: cleanUserId } });
      if (userObj) {
        finalUserId = userObj.id;
      } else {
        return res.json([]);
      }
    }

    const notes = await prisma.note.findMany({
      where: { userId: finalUserId },
      include: { tags: true },
      orderBy: { updatedAt: 'desc' }
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: String(req.params.id) },
      include: { tags: true }
    });
    if (!note) return res.status(404).json({ error: 'Not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    const note = await prisma.note.update({
      where: { id: String(req.params.id) },
      data: { title, content }
    });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update note' });
  }
};

export const getNoteContext = async (req: Request, res: Response) => {
  try {
    const { title } = req.query;
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Title is required' });
    }

    // 1. Wikipedia Fallback logic (Fast & high quality open image extraction)
    let imageUrl = '';
    let extractedText = '';
    try {
      const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
      const wikiData = await wikiRes.json();
      if (wikiData.thumbnail && wikiData.thumbnail.source) {
        imageUrl = wikiData.thumbnail.source;
      }
      if (wikiData.extract) {
        extractedText = wikiData.extract;
      }
    } catch (e) {}

    // 2. Deep Gemini Integration
    const geminiPrompt = `Analyze the topic: "${title}". Provide a highly intelligent, 3-sentence expert definition or insight about it. If it is vague, define the most likely tech or academic context. Do not use markdown headers, just plain text.`;
    
    let aiDefinition = extractedText;
    try {
       // Only run Gemini if wikipedia didn't get it, or run both and combine!
       const geminiRes = await processGemini(geminiPrompt, '');
       aiDefinition = geminiRes; // overriding with smarter gemini result
    } catch(err) {
       console.log('Gemini context error:', err);
    }

    res.json({
      title,
      definition: aiDefinition || 'No clear definition found.',
      imageUrl: imageUrl || null
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate context' });
  }
};

export const getNoteTopics = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const cleanUserId = (userId === 'undefined' || !userId) ? undefined : String(userId);
    
    if (!cleanUserId) {
      return res.json([]);
    }

    let finalUserId = cleanUserId;
    if (cleanUserId.includes('@')) {
      const userObj = await prisma.user.findUnique({ where: { email: cleanUserId } });
      if (userObj) {
        finalUserId = userObj.id;
      } else {
        return res.json([]);
      }
    }

    const notes = await prisma.note.findMany({
      where: { userId: finalUserId },
      select: { title: true, content: true },
      take: 20 // limit to 20 recent notes for context window
    });

    if (notes.length === 0) {
      return res.json(['No Data']);
    }

    const notesContext = notes.map((n: any) => `Title: ${n.title}\nContent snippet: ${n.content.replace(/<[^>]*>?/gm, '').substring(0, 100)}`).join('\n\n');
    
    const prompt = `Analyze the following list of note titles and snippets from a user's knowledge base. Categorize the user's overall knowledge into 3 to 5 high-level, professional topics (e.g. "Machine Learning", "Software Engineering", "Philosophy"). 
If the notes are random, completely unrelated, or lack any clear overarching theme, you MUST include "Arbitrary" as one of the categories. 
Return the result STRICTLY as a valid JSON array of strings ONLY. No markdown formatting, no backticks, no introduction. Example: ["Web Development", "Arbitrary", "History"].\n\nNotes Context:\n${notesContext}`;

    const geminiRes = await processGemini(prompt, '');
    let topics: string[] = [];
    
    try {
      const cleanedRes = geminiRes.replace(/```json/g, '').replace(/```/g, '').trim();
      topics = JSON.parse(cleanedRes);
      if (!Array.isArray(topics)) throw new Error('Not an array');
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", geminiRes);
      topics = ['Analysis Failed'];
    }

    res.json(topics);
  } catch (error) {
    console.error("GET TOPICS ERROR:", error);
    res.status(500).json({ error: 'Failed to extract topics' });
  }
};
