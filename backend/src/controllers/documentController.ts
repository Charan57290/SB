import { Request, Response } from 'express';
import prisma from '../config/db';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const pdf = require('pdf-parse');

const MAX_STORAGE_BYTES = 2 * 1024 * 1024 * 1024; // 2 GB

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

export const uploadConfig = multer({ storage: storage });

export const getStorageUsage = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (!userId || userId === 'undefined') {
        const globalAgg = await prisma.document.aggregate({ _sum: { sizeBytes: true }, where: { userId: null } });
        return res.json({ usedBytes: globalAgg._sum.sizeBytes || 0, limitBytes: MAX_STORAGE_BYTES });
    }

    let finalUserId = String(userId);
    if (finalUserId.includes('@')) {
      const userObj = await prisma.user.findUnique({ where: { email: finalUserId } });
      if (userObj) {
        finalUserId = userObj.id;
      } else {
        return res.json({ usedBytes: 0, limitBytes: MAX_STORAGE_BYTES });
      }
    }

    const agg = await prisma.document.aggregate({
      _sum: { sizeBytes: true },
      where: { userId: finalUserId }
    });
    
    res.json({ usedBytes: agg._sum.sizeBytes || 0, limitBytes: MAX_STORAGE_BYTES });
  } catch (error) {
    console.error("USAGE ERROR:", error);
    res.status(500).json({ error: 'Failed to compute storage usage' });
  }
};

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { userId } = req.body;
    let validUserId = null;
    
    if (userId && userId !== 'undefined') {
      let userExists = await prisma.user.findUnique({ where: { id: String(userId) } });
      if (!userExists && String(userId).includes('@')) {
        userExists = await prisma.user.findUnique({ where: { email: String(userId) } });
      }
      if (userExists) validUserId = userExists.id;
    }

    // 2 GB Quota Check
    const agg = await prisma.document.aggregate({
      _sum: { sizeBytes: true },
      where: validUserId ? { userId: validUserId } : { userId: null }
    });
    const currentUsage = agg._sum.sizeBytes || 0;
    
    if (currentUsage + req.file.size > MAX_STORAGE_BYTES) {
        fs.unlinkSync(req.file.path); // Free the local slice
        return res.status(403).json({ error: 'Storage quota exceeded (2.00 GB maximum).' });
    }

    // Background Text Extraction for AI Readability
    let extractedText = null;
    try {
        const ext = path.extname(req.file.originalname).toLowerCase();
        if (ext === '.txt' || ext === '.md' || ext === '.csv') {
            extractedText = fs.readFileSync(req.file.path, 'utf-8');
        } else if (ext === '.pdf') {
            const dataBuffer = fs.readFileSync(req.file.path);
            const data = await pdf(dataBuffer);
            extractedText = data.text;
        }
    } catch (e) {
        console.warn(`Extraction logic failed silently for ${req.file.originalname}`);
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    
    const document = await prisma.document.create({
      data: {
        title: req.file.originalname,
        fileUrl: fileUrl,
        sizeBytes: req.file.size,
        mimeType: req.file.mimetype,
        extractedText: extractedText,
        userId: validUserId,
      }
    });

    res.status(201).json(document);
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: 'Failed to upload document' });
  }
};

export const getDocuments = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const cleanUserId = (userId === 'undefined' || !userId) ? undefined : String(userId);
    
    if (!cleanUserId) {
      return res.json([]);
    }

    let finalUserId = cleanUserId;
    if (cleanUserId.includes('@')) {
      const userObj = await prisma.user.findUnique({ where: { email: cleanUserId } });
      if (userObj) {
        finalUserId = userObj.id;
      } else {
        return res.json([]);
      }
    }

    const documents = await prisma.document.findMany({
      where: { userId: finalUserId },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(documents);
  } catch (error) {
    console.error("GET DOCS ERROR:", error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};

export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const documentId = String(req.params.id);
    const document = await prisma.document.findUnique({ where: { id: documentId } });
    if (!document) return res.status(404).json({ error: 'Document not found' });
    
    const filePath = path.join(__dirname, '../../', document.fileUrl);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    await prisma.document.delete({ where: { id: documentId } });
    
    res.json({ message: 'Document removed' });
  } catch (error) {
    console.error("DELETE DOC ERROR:", error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
};
