import { ILeaderBoard } from '../interfaces';
import Matches from '../database/models/matches.model';
import Team from '../database/models/teams.model';

export default class Leaderboard {
  private static teamStatistics(teamName: string, matches: Matches[]): ILeaderBoard {
    const {
      totalVictories,
      totalDraws, totalLosses, goalsFavor, goalsOwn, goalsBalance } = this.buildCoreStats(matches);
    const totalPoints = (totalVictories * 3) + totalDraws;
    const totalMatches = matches.length;

    return {
      name: teamName,
      totalPoints,
      totalGames: matches.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency: Number(((totalPoints / (Number(totalMatches) * 3)) * 100).toFixed(2)),
    };
  }

  private static buildCoreStats(matches: Matches[]) {
    const totalVictories = matches.filter((m) => m.homeTeamGoals > m.awayTeamGoals).length;
    const totalDraws = matches.filter((m) => m.homeTeamGoals === m.awayTeamGoals).length;
    const totalLosses = matches.filter((m) => m.homeTeamGoals < m.awayTeamGoals).length;
    const goalsFavor = matches.reduce((acc, m) => acc + m.homeTeamGoals, 0);
    const goalsOwn = matches.reduce((acc, m) => acc + m.awayTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;

    return { totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn, goalsBalance };
  }

  private static buildBoard(matches: Matches[], id: number, teamName: string) {
    const teamMatches = matches.filter((m) => m.homeTeamId === id);
    return this.teamStatistics(teamName, teamMatches);
  }

  public static buildLeaderboard(matches: Matches[], teams: Team[]) {
    const leaderboard = teams.map((t) => this.buildBoard(matches, t.id, t.teamName));
    return leaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor));
  }
}
