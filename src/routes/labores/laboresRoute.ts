import express from 'express';
import { createLabor, updateLabor } from '../../controllers/labor/controllerLabor';
import { sanitizeLaborData } from '../../middleware/sanitize';

export const laborRouter = express.Router();

laborRouter.route('/')
    .post(createLabor)
    .put(sanitizeLaborData, updateLabor)