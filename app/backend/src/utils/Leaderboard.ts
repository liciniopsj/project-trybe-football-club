import { ILeaderBoard } from '../interfaces';
import Matches from '../database/models/matches.model';
import Team from '../database/models/teams.model';

export default class Leaderboard {
  private static homeTeamStatistics(teamName: string, matches: Matches[]): ILeaderBoard {
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

  private static awayTeamStatistics(teamName: string, matches: Matches[]): ILeaderBoard {
    const {
      totalVictories,
      totalDraws,
      totalLosses, goalsFavor, goalsOwn, goalsBalance } = this.buildAwayCoreStats(matches);
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

  private static buildAwayCoreStats(matches: Matches[]) {
    const totalVictories = matches.filter((m) => m.awayTeamGoals > m.homeTeamGoals).length;
    const totalDraws = matches.filter((m) => m.awayTeamGoals === m.homeTeamGoals).length;
    const totalLosses = matches.filter((m) => m.awayTeamGoals < m.homeTeamGoals).length;
    const goalsFavor = matches.reduce((acc, m) => acc + m.awayTeamGoals, 0);
    const goalsOwn = matches.reduce((acc, m) => acc + m.homeTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;

    return { totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn, goalsBalance };
  }

  private static buildHomeBoard(matches: Matches[], id: number, teamName: string) {
    const homeMatches = matches.filter((m) => m.homeTeamId === id);
    return this.homeTeamStatistics(teamName, homeMatches);
  }

  private static buildAwayBoard(matches: Matches[], id: number, teamName: string) {
    const awayMatches = matches.filter((m) => m.awayTeamGoals === id);
    return this.awayTeamStatistics(teamName, awayMatches);
  }

  private static sortBoard(leaderboard: ILeaderBoard[]): ILeaderBoard[] {
    return leaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor));
  }

  public static buildHomeLeaderboard(matches: Matches[], teams: Team[]) {
    const leaderboard = teams.map((t) => this.buildHomeBoard(matches, t.id, t.teamName));
    return this.sortBoard(leaderboard);
  }

  public static buildAwayLeaderboard(matches: Matches[], teams: Team[]) {
    const leaderboard = teams.map((t) => this.buildAwayBoard(matches, t.id, t.teamName));
    return this.sortBoard(leaderboard);
  }
}
