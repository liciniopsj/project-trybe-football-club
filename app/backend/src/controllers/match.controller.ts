import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  static async findAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const data = await MatchService.findAll();
    if (inProgress === 'true') {
      return res.json(data.filter((match) => match.inProgress === true));
    }
    if (inProgress === 'false') {
      return res.json(data.filter((match) => match.inProgress === false));
    }
    return res.json(data);
  }

  static async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await MatchService.finishMatch(Number(id));
    return res.json({ message: 'Finished' });
  }

  static async updateScore(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const response = await MatchService.updateScore(Number(id), req.body);
    return res.json(response);
  }

  static async createMatch(req: Request, res: Response): Promise<Response> {
    const response = await MatchService.createMatch(req.body);
    return res.json(response);
  }
}
