import express from 'express';
import { coordinadorCRUDuser, createDocente, showCoordinadorPrincipal, showCreateCoordinadorCreateUser, showUpdateDocente, updateDocente } from '../../controllers/users/controllerUser';
import { checkUserAccess } from '../../middleware/auth';
export const docenteRouter = express.Router();

docenteRouter.get('/coordinadorPrincipal',checkUserAccess(3),showCoordinadorPrincipal);
docenteRouter.get('/coordinadorCRUDuser',checkUserAccess(3), coordinadorCRUDuser);
docenteRouter.get('/coordinadorUpdateUserView/:user_identification',checkUserAccess(3), showUpdateDocente)
docenteRouter.post('/coordinadorUpdateUser/:user_id/:user_role_id',checkUserAccess(3), updateDocente);
docenteRouter.get('/coordinadorCreateUserView',checkUserAccess(3),showCreateCoordinadorCreateUser)
docenteRouter.post('/coordinadorCreateUser',checkUserAccess(3),createDocente)
export default docenteRouter;