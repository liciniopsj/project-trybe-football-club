import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import { tokenValidation } from '../utils/auth';

const { login, findRole } = LoginController;
const loginRouter = Router();

loginRouter
  .post('/', login)
  .get('/role', tokenValidation, findRole);

export default loginRouter;
