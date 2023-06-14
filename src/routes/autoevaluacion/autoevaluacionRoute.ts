import express from 'express';
import { createAutoevaluacion } from '../../controllers/autoevaluacion/controllerAutoevaluacion';

export const autoEvaluationRouter = express.Router();

autoEvaluationRouter.route('/')
    .post(createAutoevaluacion)