import express from 'express';
import { coordinadorCRUDuser, createDocente, informacionDocente, showCoordinadorPrincipal, showCreateCoordinadorCreateUser, showDecanoPrincipal, showDocentePrincipal, showInformacionDocente, showUpdateDocente, updateDocente } from '../../controllers/users/controllerUser';
import { checkUserAccess } from '../../middleware/auth';
export const userRouter = express.Router();

//Docente
userRouter.get('/docentePrincipal',checkUserAccess(1),showDocentePrincipal);
userRouter.get('/showDocenteInformacionPersonal',checkUserAccess(1),showInformacionDocente);
userRouter.get('/docenteInformacionPersonal',checkUserAccess(1),informacionDocente);

//Decano
userRouter.get('/decanoPrincipal',checkUserAccess(2),showDecanoPrincipal);

//Coordinador
userRouter.get('/coordinadorPrincipal',checkUserAccess(3),showCoordinadorPrincipal);
userRouter.get('/coordinadorCRUDuser',checkUserAccess(3), coordinadorCRUDuser);
userRouter.get('/coordinadorUpdateUserView/:user_identification',checkUserAccess(3), showUpdateDocente)
userRouter.post('/coordinadorUpdateUser/:user_id/:user_role_id',checkUserAccess(3), updateDocente);
userRouter.get('/coordinadorCreateUserView',checkUserAccess(3),showCreateCoordinadorCreateUser)
userRouter.post('/coordinadorCreateUser',checkUserAccess(3),createDocente)

export default userRouter;