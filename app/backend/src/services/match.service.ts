import NewMatch from '../types/NewMatch';
import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';
import { IRes, IScore } from '../interfaces';

export default class MatchService {
  static async findAll(): Promise<Matches[]> {
    const data = await Matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return data;
  }

  static async finishMatch(id: number): Promise<IRes> {
    await Matches.update({ inProgress: false }, { where: { id } });
    return { status: 200, message: 'Finished' };
  }

  static async updateScore(id: number, score: IScore): Promise<IRes | undefined> {
    const { homeTeamGoals, awayTeamGoals } = score;
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { status: 200, message: 'Match score updated' };
  }

  static async createMatch(match: NewMatch): Promise<NewMatch> {
    const data = await Matches.create(match);
    return data;
  }
}
