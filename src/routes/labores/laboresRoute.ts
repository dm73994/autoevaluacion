import express from 'express';
import { createLabor, disableLabor, updateLabor } from '../../controllers/users/controllerLabor';

export const laborRouter = express.Router();

laborRouter.route('/')
    .post(createLabor)
    .put(updateLabor)