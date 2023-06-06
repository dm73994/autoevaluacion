import express from 'express';
import { createLabor, disableLabor, updateLabor } from '../../controllers/users/controllerLabor';

export const laborRouter = express.Router();

laborRouter.route('/createLabor')
    .post(createLabor)
    .put(updateLabor)
    .put(disableLabor)