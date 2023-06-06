import express from 'express';
import { createLabor } from '../../controllers/users/controllerLabor';
export const authRouter = express.Router();

authRouter.route('/createLabor')
    .post(createLabor)
