import express from 'express';
import { endSetion, login, paginaError, showLogin } from '../../controllers/auth/controllerLogin';
import { checkAuth } from '../../middleware/auth';

export const authRouter = express.Router();

authRouter.get('/login',showLogin);
authRouter.post('/login',login);
authRouter.get('/logout',endSetion);
authRouter.get('/error'),paginaError;
export default authRouter;