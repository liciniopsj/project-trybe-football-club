import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  static async findAll(req: Request, res: Response): Promise<Response | void> {
    const data = await MatchService.findAll();
    return res.json(data);
  }
}
