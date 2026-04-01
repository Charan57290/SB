import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes';
import noteRoutes from './routes/noteRoutes';
import brainKitRoutes from './routes/brainKitRoutes';
import assistantRoutes from './routes/assistantRoutes';

dotenv.config();

const app = express();
// Database offline - Mock Mode Active

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/brainkit', brainKitRoutes);
app.use('/api/assistant', assistantRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
