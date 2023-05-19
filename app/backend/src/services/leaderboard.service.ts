import Team from '../database/models/teams.model';
import Matches from '../database/models/matches.model';
import { ILeaderBoard } from '../interfaces';
import Leaderboard from '../utils/Leaderboard';

export default class LeaderboardService {
  static async leaderboard(): Promise<ILeaderBoard[]> {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Team.findAll();
    return Leaderboard.buildLeaderboard(matches, teams);
  }
}
