import { Router } from 'express';
import multer from 'multer';
import { humanize, summarize, generateContent, generateFlashcards, generateCitations } from '../controllers/brainKitController';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

router.post('/writing/humanize', humanize);
router.post('/writing/generate', generateContent);
router.post('/research/summarize', upload.single('file'), summarize);
router.post('/research/citations', generateCitations);
router.post('/study/flashcards', generateFlashcards);

export default router;
