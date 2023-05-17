import { Request, Response } from 'express';
import MatchService from '../services/match.service';
import TeamsService from '../services/teams.service';

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
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res
        .status(422)
        .json({
          message: 'It is not possible to create a match with two equal teams',
        });
    }

    const homeTeam = await TeamsService.findById(homeTeamId);
    if (!homeTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    const awayTeam = await TeamsService.findById(awayTeamId);
    if (!awayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const response = await MatchService.createMatch(req.body);
    return res.json(response);
  }
}
