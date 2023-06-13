import express from 'express';
import { coordinadorCRUDuser, createDocente, showCoordinadorPrincipal, showUpdateDocente, updateDocente } from '../../controllers/users/controllerUser';

export const docenteRouter = express.Router();

docenteRouter.route('/')
    .post(createDocente)
    .put(updateDocente)
    .get(showCoordinadorPrincipal)

docenteRouter.get('/coordinadorCRUDuser', coordinadorCRUDuser);
docenteRouter.get('/coordinadorUpdateUserView/:user_id', showUpdateDocente)
docenteRouter.post('/coordinadorUpdateUser/:user_id', updateDocente)

export default docenteRouter;