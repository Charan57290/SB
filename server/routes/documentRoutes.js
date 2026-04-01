import express from 'express';
import { getDocuments, uploadDocument, deleteDocument } from '../controllers/documentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getDocuments).post(protect, uploadDocument);
router.route('/:id').delete(protect, deleteDocument);

export default router;
