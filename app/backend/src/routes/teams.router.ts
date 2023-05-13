import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const teamRouter = Router();

teamRouter.get('/', TeamsController.findAll);
teamRouter.get('/:id', TeamsController.findById);

export default teamRouter;
