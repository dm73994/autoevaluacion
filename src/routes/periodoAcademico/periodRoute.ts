import express from 'express';
import { createPeriodoAcademico } from '../../controllers/periodoAcademico/controllerPeriodoAcademico';

export const periodoRouter = express.Router();

periodoRouter.route('/')
    .post(createPeriodoAcademico)
