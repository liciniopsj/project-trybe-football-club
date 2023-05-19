import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  static async HomeLeaderboard(_req: Request, res: Response): Promise<Response> {
    const data = await LeaderboardService.homeLeaderboard();
    return res.json(data);
  }

  static async AwayLeaderboard(_req: Request, res: Response): Promise<Response> {
    const data = await LeaderboardService.awayLeaderboard();
    return res.json(data);
  }
}
