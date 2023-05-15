import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as jwt.Secret | 'jwt_secret';

const tokenGeneration = (email: string) => jwt.sign({ email }, SECRET_KEY);

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const validToken = jwt.verify(token, SECRET_KEY);
    res.locals.token = validToken;
    return next();
  } catch (e: unknown) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export { tokenValidation, tokenGeneration };
