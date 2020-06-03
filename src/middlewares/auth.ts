import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../config/auth';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'token not provided' });
  }

  const [, token] = authHeader.split(' ');
  console.log(authHeader);
  try {
    console.log(token);
    const decoded: any = await promisify(jwt.verify)(token, authConfig.secret);
    console.log(decoded);
    res.setHeader('userId', decoded.id);

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'token invalid' });
  }

  return next();
};
