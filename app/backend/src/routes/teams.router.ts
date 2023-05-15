import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const teamRouter = Router();

teamRouter.get('/', (req, res) => TeamsController.findAll(req, res));
teamRouter.get('/:id', (req, res) => TeamsController.findById(req, res));

export default teamRouter;
