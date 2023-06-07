import express from 'express';
import { createPeriodoAcademico } from '../../controllers/users/controllerPeriodoAcademico';

export const periodoRouter = express.Router();

periodoRouter.route('/')
    .post(createPeriodoAcademico)
