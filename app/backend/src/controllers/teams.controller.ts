import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  static async findAll(_req: Request, res: Response) {
    const data = await TeamsService.findAll();
    return res.json(data);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const data = await TeamsService.findById(id);
    // if (!data) return res.status(404).json({ message: 'Team Not Found' });
    return res.json(data);
  }
}
