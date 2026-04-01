import { Request, Response } from 'express';

const mockNotes = [
  { id: '1', title: 'Neural Research Alpha', content: 'Synthetic intelligence patterns identified in recent clusters.', createdAt: new Date(), tags: [{ name: 'ai' }, { name: 'research' }] },
  { id: '2', title: 'Second Brain Protocol', content: 'Connecting distributed nodes via semantic links.', createdAt: new Date(), tags: [{ name: 'internal' }] }
];

export const createNote = async (req: Request, res: Response) => {
  const note = { id: Math.random().toString(), ...req.body, createdAt: new Date(), tags: [] };
  res.status(201).json(note);
};

export const getNotes = async (req: Request, res: Response) => {
  res.json(mockNotes);
};

export const getNoteById = async (req: Request, res: Response) => {
  const note = mockNotes.find(n => n.id === req.params.id) || mockNotes[0];
  res.json(note);
};

export const updateNote = async (req: Request, res: Response) => {
  res.json({ message: 'Updated' });
};
