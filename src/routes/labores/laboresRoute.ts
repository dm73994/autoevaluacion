import express from 'express';
import { createLabor, updateLabor } from '../../controllers/labor/controllerLabor';

export const laborRouter = express.Router();

laborRouter.route('/')
    .post(createLabor)
    .put(updateLabor)