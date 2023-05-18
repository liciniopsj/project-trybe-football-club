import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import { tokenValidation } from '../utils/auth';
import matchValidation from '../middlewares/matchValidation';

const { findAll, updateScore, finishMatch, createMatch } = MatchController;
const matchRouter = Router();

matchRouter
  .get('/', findAll)
  .post('/', tokenValidation, matchValidation, createMatch)
  .patch('/:id', tokenValidation, updateScore)
  .patch('/:id/finish', tokenValidation, finishMatch);

export default matchRouter;
