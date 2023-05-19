import Team from '../database/models/teams.model';
import Matches from '../database/models/matches.model';
import { ILeaderBoard } from '../interfaces';
import Leaderboard from '../utils/Leaderboard';

export default class LeaderboardService {
  static async homeLeaderboard(): Promise<ILeaderBoard[]> {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Team.findAll();
    return Leaderboard.buildHomeLeaderboard(matches, teams);
  }

  static async awayLeaderboard(): Promise<ILeaderBoard[]> {
    const matches = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Team.findAll();
    return Leaderboard.buildAwayLeaderboard(matches, teams);
  }
}
