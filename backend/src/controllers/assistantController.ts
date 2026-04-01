import { Request, Response } from 'express';

export const askAssistant = async (req: Request, res: Response) => {
  const { query } = req.body;
  const result = `I have analyzed "${query}" against your mock intelligence nodes. It appears to be a link in your knowledge graph.`;
  res.json({ result });
};
