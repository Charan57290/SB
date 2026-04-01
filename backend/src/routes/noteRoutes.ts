import { Router } from 'express';
import { createNote, getNotes, getNoteById, updateNote } from '../controllers/noteController';

const router = Router();

router.post('/', createNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);

export default router;
