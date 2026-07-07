import { Router } from 'express';
import { updateProfile } from '../controllers/userController';
import { uploadConfig } from '../controllers/documentController';

const router = Router();

router.put('/profile', uploadConfig.single('avatar'), updateProfile);

export default router;
