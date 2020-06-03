import { PrismaClient, UserCreateInput } from '@prisma/client';
import { Request, Response } from 'express';
import AuthConfig from '../config/auth';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

class AuthController {
  async store(req: Request, res: Response): Promise<Response> {
    const userLogin: UserCreateInput = req.body;

    const userCheck = await prisma.user.findOne({
      where: { email: userLogin.email },
      include: {
        image: true,
      },
    });
    if (!userCheck) {
      return res.status(400).json('User not exists');
    }

    const compare = await bcrypt.compare(
      userLogin.password,
      userCheck.password,
    );

    if (!compare) {
      return res.status(400).json('Password dos not match');
    }

    return res.json({
      user: {
        id: userCheck.id,
        name: userCheck.name,
        email: userCheck.email,
        avatarUrl: userCheck.image?.url,
      },
      token: jwt.sign({ id: userCheck.id }, AuthConfig.secret, {
        expiresIn: AuthConfig.expiresIn,
      }),
    });
  }
}

export default new AuthController();
