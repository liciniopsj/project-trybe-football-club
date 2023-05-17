import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  static async findAll(req: Request, res: Response): Promise<Response | void> {
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
}
