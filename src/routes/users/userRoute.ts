import express from 'express';
import { coordinadorCRUDuser, createDocente, showCoordinadorPrincipal, showCreateCoordinadorCreateUser, showUpdateDocente, updateDocente } from '../../controllers/users/controllerUser';

export const docenteRouter = express.Router();

docenteRouter.get('/coordinadorPrincipal',showCoordinadorPrincipal);
docenteRouter.get('/coordinadorCRUDuser', coordinadorCRUDuser);
docenteRouter.get('/coordinadorUpdateUserView/:user_id', showUpdateDocente)
docenteRouter.post('/coordinadorUpdateUser/:user_id', updateDocente)
docenteRouter.get('/coordinadorCreateUserView',showCreateCoordinadorCreateUser)
docenteRouter.post('/coordinadorCreateUser',createDocente)
export default docenteRouter;