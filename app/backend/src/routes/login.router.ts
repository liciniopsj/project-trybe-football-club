import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import { tokenValidation } from '../utils/auth';

const loginRouter = Router();

loginRouter.post('/', (req, res) => LoginController.login(req, res));
loginRouter.get('/role', tokenValidation, (req, res) => LoginController.findRole(req, res));

export default loginRouter;
