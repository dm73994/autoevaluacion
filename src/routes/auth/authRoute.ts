import express from 'express';
import { login, showLogin } from '../../controllers/auth/controllerLogin';
import { register, showRegister } from '../../controllers/auth/controllerRegister';
import { checkAuth } from '../../middleware/auth';
import { createLabor } from '../../controllers/auth/controllerLabor';

export const authRouter = express.Router();

authRouter.route('/login')
    .post(checkAuth, login)

authRouter.route('/register')
    .post(register)

authRouter.route('/createLabor')
    .post(createLabor)
