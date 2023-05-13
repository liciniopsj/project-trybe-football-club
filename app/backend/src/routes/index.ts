import { Router } from 'express';
import teamRouter from './teams.router';

const router = Router();

router.get('/teams', teamRouter);

export default router;
