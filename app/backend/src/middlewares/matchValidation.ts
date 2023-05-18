import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/teams.service';

const matchValidation = async (req: Request, res: Response, next: NextFunction) => {
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

  next();
};

export default matchValidation;
