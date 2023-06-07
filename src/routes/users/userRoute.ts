import express from 'express';
import { createDocente, updateDocente } from '../../controllers/users/controllerUser';

export const docenteRouter = express.Router();

docenteRouter.route('/')
    .post(createDocente)
    .put(updateDocente)