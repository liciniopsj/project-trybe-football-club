import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  static async Homeleaderboard(_req: Request, res: Response): Promise<Response> {
    const data = await LeaderboardService.leaderboard();
    return res.json(data);
  }
}
