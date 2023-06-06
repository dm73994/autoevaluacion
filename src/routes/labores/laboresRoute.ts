import express from 'express';
import { createLabor } from '../../controllers/auth/controllerLabor';
export const authRouter = express.Router();

authRouter.route('/createLabor')
    .post(createLabor)
