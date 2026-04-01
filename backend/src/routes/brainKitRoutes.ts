import { Router } from 'express';
import { humanize, summarize, generateContent } from '../controllers/brainKitController';

const router = Router();

router.post('/writing/humanize', humanize);
router.post('/writing/generate', generateContent);
router.post('/research/summarize', summarize);

export default router;
