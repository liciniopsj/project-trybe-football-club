import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const payload = req.body;
    const data = await LoginService.login(payload);
    if (!data.token) return res.status(data.status).json({ message: data.message });
    return res.status(data.status).json(data.token);
  }

  static async findRole(_req: Request, res: Response) {
    const payload = res.locals.token;
    const data = await LoginService.findRole(payload);
    return res.status(data.status).json(data.role);
  }
}
