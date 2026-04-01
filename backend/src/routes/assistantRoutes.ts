import { Router } from 'express';
import { askAssistant } from '../controllers/assistantController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/ask', authMiddleware, askAssistant);

export default router;
