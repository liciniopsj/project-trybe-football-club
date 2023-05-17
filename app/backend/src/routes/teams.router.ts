import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const { findAll, findById } = TeamsController;
const teamRouter = Router();

teamRouter
  .get('/', findAll)
  .get('/:id', findById);

export default teamRouter;
