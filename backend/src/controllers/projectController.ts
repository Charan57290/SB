import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response) => {
  const authReq = req as any; 
  try {
    const userId = authReq.userId; // Secure ID from JWT (email)
    console.log("DEBUG: getProjects using JWT userId =", userId);
    
    // Lookup by email (since that is what's in the JWT)
    const user = await prisma.user.findUnique({ where: { email: String(userId) } });
    if (!user) {
        console.log("DEBUG: User not found in getProjects");
        return res.status(404).json({ error: 'User not found' });
    }

    const projects = await prisma.project.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(projects);
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const authReq = req as any;
  try {
    const { name, description, githubUrl } = req.body;
    const userId = authReq.userId; // Secure ID from JWT (email)
    if (!name || !userId) return res.status(400).json({ error: 'Name and authenticated user are required' });
    
    const user = await prisma.user.findUnique({ where: { email: String(userId) } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const project = await prisma.project.create({
      data: {
        name,
        description,
        githubUrl,
        userId: user.id
      }
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

export const getGithubRepos = async (req: Request, res: Response) => {
  const authReq = req as any;
  try {
    const userId = authReq.userId; // Secure ID from JWT (email)
    if (!userId) return res.status(400).json({ error: 'Authentication required' });

    const user = await prisma.user.findUnique({ where: { email: String(userId) } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.githubToken) {
        return res.status(401).json({ error: 'GitHub not connected' });
    }

    const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=10', {
        headers: {
            'Authorization': `Bearer ${user.githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });

    if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch repositories from GitHub' });
    }

    const repos = await response.json();
    res.json(repos);
  } catch (error) {
    console.error("GITHUB REPOS ERROR:", error);
    res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
  }
};

export const connectGithubToken = async (req: Request, res: Response) => {
  const authReq = req as any;
  try {
    const { token } = req.body;
    const userId = authReq.userId; // Secure ID from JWT (email)
    
    console.log("DEBUG: connectGithubToken using JWT userId =", userId);
    if (!userId) {
        return res.status(400).json({ error: 'Authentication required' });
    }

    const user = await prisma.user.findUnique({ where: { email: String(userId) } });
    if (!user) {
        console.log("DEBUG: User not found in connectGithubToken");
        return res.status(404).json({ error: 'User not found' });
    }

    // If token is null or empty, we are disconnecting
    if (!token) {
        await prisma.user.update({
            where: { id: user.id },
            data: { githubToken: null }
        });
        return res.json({ message: 'GitHub disconnected successfully' });
    }

    // Validate token against GitHub API if not null
    const response = await fetch('https://api.github.com/user', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });

    if (!response.ok) {
        return res.status(401).json({ error: 'Invalid GitHub Personal Access Token' });
    }

    // Save token to user profile
    await prisma.user.update({
        where: { id: user.id },
        data: { githubToken: token }
    });

    res.json({ message: 'GitHub connected successfully' });
  } catch (error) {
    console.error("GITHUB CONNECT ERROR:", error);
    res.status(500).json({ error: 'Failed to connect to GitHub' });
  }
};
