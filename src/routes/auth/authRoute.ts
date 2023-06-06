import express from 'express';
import { login, showLogin } from '../../controllers/auth/controllerLogin';
import { register, showRegister } from '../../controllers/auth/controllerRegister';
import { checkAuth } from '../../middleware/auth';

export const authRouter = express.Router();

authRouter.route('/login')
    .post(login)

authRouter.route('/register')
    .post(register)