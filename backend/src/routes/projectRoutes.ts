import { Router } from 'express';
import { getProjects, createProject, getGithubRepos, connectGithubToken } from '../controllers/projectController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Apply authMiddleware to all routes
router.use(authMiddleware);

router.post('/github/connect', connectGithubToken);
router.get('/github/repos', getGithubRepos);
router.get('/', getProjects);
router.post('/', createProject);

export default router;
