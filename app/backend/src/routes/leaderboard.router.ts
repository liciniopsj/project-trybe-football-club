import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const { Homeleaderboard } = LeaderboardController;

const leaderboardRouter = Router();

leaderboardRouter
  .get('/home', Homeleaderboard);

export default leaderboardRouter;
