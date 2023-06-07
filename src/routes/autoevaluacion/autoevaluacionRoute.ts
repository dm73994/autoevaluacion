import express from 'express';
import { createAutoevaluacion } from '../../controllers/users/controllerAutoevaluacion';

export const autoEvaluationRouter = express.Router();

autoEvaluationRouter.route('/')
    .post(createAutoevaluacion)