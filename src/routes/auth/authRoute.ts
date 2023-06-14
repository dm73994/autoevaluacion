import express from 'express';
import { endSetion, login, showLogin } from '../../controllers/auth/controllerLogin';
import { checkAuth } from '../../middleware/auth';

export const authRouter = express.Router();

authRouter.get('/login',showLogin);
authRouter.post('/login',login);
authRouter.get('/logout',endSetion);
export default authRouter;