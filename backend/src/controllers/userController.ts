import { Request, Response } from 'express';
import prisma from '../config/db';

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required to update profile' });
    }

    const dataToUpdate: any = {};
    if (name) dataToUpdate.name = name;
    
    if (req.file) {
      dataToUpdate.avatar = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: dataToUpdate,
    });

    res.json({
      message: 'Profile updated successfully',
      user: {
        userId: updatedUser.email,
        email: updatedUser.email,
        name: updatedUser.name,
        avatar: updatedUser.avatar,
      }
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
