import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const { findAll } = MatchController;
const matchRouter = Router();

matchRouter
  .get('/', findAll);

export default matchRouter;
