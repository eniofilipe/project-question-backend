import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

class AvatarController {
  async store(req: Request, res: Response): Promise<Response> {
    const { filename: path } = req.file;

    const newAvatar = await prisma.avatar.create({
      data: {
        path,
        url: `${process.env.APP_URL}/files/${path}`,
      },
    });

    const avatar = {
      id: newAvatar.id,
      path: newAvatar.path,
      url: newAvatar.url,
    };
    return res.json(avatar);
  }
}

export default new AvatarController();
