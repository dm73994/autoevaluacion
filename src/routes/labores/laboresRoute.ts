import express from 'express';
import { createLabor } from '../../controllers/users/controllerLabor';

export const laborRouter = express.Router();

laborRouter.route('/createLabor')
    .post(createLabor)