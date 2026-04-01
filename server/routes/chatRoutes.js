import express from 'express';
import { getChatHistory, askQuestion } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getChatHistory).post(protect, askQuestion);

export default router;
