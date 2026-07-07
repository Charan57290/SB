import { Router } from 'express';
import { getDocuments, uploadDocument, deleteDocument, uploadConfig, getStorageUsage } from '../controllers/documentController';

const router = Router();

router.get('/usage', getStorageUsage);
router.get('/', getDocuments);
router.post('/', uploadConfig.single('file'), uploadDocument);
router.delete('/:id', deleteDocument);

export default router;
