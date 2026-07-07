import { Router } from 'express';
import { createNote, getNotes, getNoteById, updateNote, getNoteContext, getNoteTopics } from '../controllers/noteController';

const router = Router();

router.get('/topics', getNoteTopics);
router.get('/context', getNoteContext);
router.post('/', createNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);

export default router;
