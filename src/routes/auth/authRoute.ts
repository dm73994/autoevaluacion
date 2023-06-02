import express from 'express';
import { login, showLogin } from '../../controllers/auth/controllerLogin';
import { register, showRegister } from '../../controllers/auth/controllerRegister';

export const authRouter = express.Router();


authRouter.route('/login')
    .get(showLogin)
    .post(login)

authRouter.route('/register')
    .get(showRegister)
    .post(register)


