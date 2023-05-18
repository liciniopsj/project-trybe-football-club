import { Router } from 'express';

const leaderboardRouter = Router();

leaderboardRouter
  .get('/home', (_req, res) => res.json({ message: 'ok' }));

export default leaderboardRouter;
