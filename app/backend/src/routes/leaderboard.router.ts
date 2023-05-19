import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const { HomeLeaderboard, AwayLeaderboard } = LeaderboardController;

const leaderboardRouter = Router();

leaderboardRouter
  .get('/home', HomeLeaderboard)
  .get('/away', AwayLeaderboard);

export default leaderboardRouter;
