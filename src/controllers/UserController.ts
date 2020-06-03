import { PrismaClient, UserCreateInput } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

interface UserStore extends UserCreateInput {
  passwordConfirm: string;
  avatarId: number;
}

interface User {
  id: number;
  email: string;
  name: string;
  avatarId: number | null;
  path: string | null;
  url: string | null;
}

class UserController {
  async index(req: Request, res: Response): Promise<Response> {
    const nameSearch = req.params.name || '';

    const Users = await prisma.raw<User[]>(
      `SELECT public."User"."id", public."User"."email", public."User"."name", 
      public."User"."avatarId", public."Avatar"."path", public."Avatar"."url"
      FROM public."User" 
      LEFT OUTER JOIN public."Avatar"
      ON public."User"."avatarId" = public."Avatar"."id" 
      WHERE public.unaccent(name) ~* public.unaccent('${nameSearch}') 
      ORDER BY public."User"."createdAt"`,
    );

    return res.json(Users);
  }
  async store(req: Request, res: Response): Promise<Response> {
    const newUser: UserStore = req.body;

    const { password, passwordConfirm } = newUser;

    const userCheck = await prisma.user.findOne({
      where: {
        email: newUser.email,
      },
    });

    if (userCheck) {
      return res.status(400).json('User exists!');
    }

    if (password !== passwordConfirm) {
      return res.status(400).json('Passwords dont match!');
    }

    newUser.password = await bcrypt.hash(password, 8);
    const { id, name, email, avatarId, image } = await prisma.user.create({
      data: newUser.avatarId
        ? {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            image: {
              connect: {
                id: newUser.avatarId,
              },
            },
          }
        : {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
          },
      include: { image: true },
    });

    return res.json({
      id,
      name,
      email,
      avatarId,
      path: image && image.path,
      url: image && image.url,
    });
  }
}

export default new UserController();
