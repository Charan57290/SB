import { Router } from 'express';
import { register, login, githubOAuth, githubOAuthCallback, googleOAuth, googleOAuthCallback } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/github', githubOAuth);
router.get('/github/callback', githubOAuthCallback);

router.get('/google', googleOAuth);
router.get('/google/callback', googleOAuthCallback);

export default router;
