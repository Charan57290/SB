import ChatHistory from '../models/ChatHistory.js';
import Document from '../models/Document.js';
import Note from '../models/Note.js';

export const getChatHistory = async (req, res) => {
  try {
    const history = await ChatHistory.find({ userId: req.user._id }).sort({ createdAt: 1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const askQuestion = async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ message: 'Please provide a question' });
  }
  
  try {
    // 1. Retrieve user's documents and notes to build context
    const notes = await Note.find({ userId: req.user._id });
    const documents = await Document.find({ userId: req.user._id });
    
    // In a real implementation:
    // const context = createEmbeddingsAndSearch(question, notes, documents);
    // const aiResponse = await callLLM(question, context);
    
    // Mock response for now
    const mockDbCount = notes.length + documents.length;
    let answer = `This is a mocked AI response. You have ${mockDbCount} items in your Second Brain. To answer "${question}", I would process your notes and documents through an AI provider.`;
    
    const chat = new ChatHistory({
      question,
      answer,
      userId: req.user._id
    });
    
    const savedChat = await chat.save();
    
    res.status(201).json(savedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
