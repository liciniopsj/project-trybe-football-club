import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';

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
}
