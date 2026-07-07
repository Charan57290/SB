import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';
import brainKitRoutes from './routes/brainKitRoutes';
import assistantRoutes from './routes/assistantRoutes';
import documentRoutes from './routes/documentRoutes';
import projectRoutes from './routes/projectRoutes';
import userRoutes from './routes/userRoutes';
import path from 'path';

dotenv.config();

const app = express();
// Database offline - Mock Mode Active

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/brainkit', brainKitRoutes);
app.use('/api/assistant', assistantRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/projects', projectRoutes);

// Static mapping for direct file serving
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
