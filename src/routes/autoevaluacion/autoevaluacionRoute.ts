import express from 'express';
import { showDocenteAutoevaluationDiligenciar,showConsultarAutoevaluacionesArchivo,coordinadorAutoevaluaciones,showCoordinadorDiligenciar,coordinadorCrudAutoevaluacion, createAutoevaluacion, showCoordinadorCreateAutoevaluacion, showCoordinadorCrudAutoevaluation,showAutoevaluationUpdate,updateAutoevaluation, showAutoevaluationDiligenciar, diligenciarAutoevaluation, consultarAutoevaluacionesArchivo, showDocenteDiligenciar, docenteAutoevaluaciones, diligenciarDocenteAutoevaluation, decanoAutoevaluationes, showDecanoAutoevaluationes, decanoAutoevaluationCoordinador, showDecanoAutoevaluationCoordinador, updateAutoevaluationCoordinador, showAutoevaluationUpdateCoordinador } from '../../controllers/autoevaluacion/controllerAutoevaluacion';
import { checkUserAccess } from '../../middleware/auth';
import { informacionDocente, showInformacionDocente } from '../../controllers/users/controllerUser';

export const autoEvaluationRouter = express.Router();


//docente 
autoEvaluationRouter.get("/showDocenteAutoevaluaciones",checkUserAccess(1),showConsultarAutoevaluacionesArchivo);
autoEvaluationRouter.get("/docenteAutoevaluaciones",checkUserAccess(1),consultarAutoevaluacionesArchivo);
autoEvaluationRouter.get("/showDocenteDiligenciar",checkUserAccess(1),showDocenteDiligenciar);
autoEvaluationRouter.get("/docenteDiligenciar",checkUserAccess(1),docenteAutoevaluaciones);
autoEvaluationRouter.get("/docenteDiligenciarAutoevaluacionView/:autoevaluation_id", checkUserAccess(1), showDocenteAutoevaluationDiligenciar);
autoEvaluationRouter.post("/docenteDiligenciarAutoevaluacion/:autoevaluation_id", checkUserAccess(1), diligenciarDocenteAutoevaluation);

//decano
autoEvaluationRouter.get("/decanoAutoevaluaciones",checkUserAccess(2),decanoAutoevaluationes);
autoEvaluationRouter.get("/decanoAutoevaluacionesView",checkUserAccess(2),showDecanoAutoevaluationes);
autoEvaluationRouter.get("/decanoAutoevaluacionCoordinador",checkUserAccess(2),decanoAutoevaluationCoordinador);
autoEvaluationRouter.get("/decanoAutoevaluacionCoordinadorView",checkUserAccess(2),showDecanoAutoevaluationCoordinador);
autoEvaluationRouter.get("/decanoUpdateAutoevaluacionCoordinadorView/:autoevaluation_id",checkUserAccess(2),showAutoevaluationUpdateCoordinador);
autoEvaluationRouter.post("/decanoUpdateAutoevaluacionCoordinador/:autoevaluation_id",checkUserAccess(2),updateAutoevaluationCoordinador)

//coordinador
autoEvaluationRouter.get("/coordinadorCrudAutoevaluacion", checkUserAccess(3), coordinadorCrudAutoevaluacion);
autoEvaluationRouter.get("/coordinadorCrudAutoevaluacionView", checkUserAccess(3), showCoordinadorCrudAutoevaluation);
autoEvaluationRouter.post("/coordinadorCreateAutoevaluacion", checkUserAccess(3), createAutoevaluacion);
autoEvaluationRouter.get("/coordinadorCreateAutoevaluacionView",checkUserAccess(3),showCoordinadorCreateAutoevaluacion);
autoEvaluationRouter.get("/coordinadorUpdateAutoevaluacionView/:autoevaluation_id", checkUserAccess(3), showAutoevaluationUpdate);
autoEvaluationRouter.post("/coordinadorUpdateAutoevaluacion/:autoevaluation_id", checkUserAccess(3), updateAutoevaluation);
autoEvaluationRouter.get("/coordinadorDiligenciarAutoevaluaciones",checkUserAccess(3),coordinadorAutoevaluaciones);
autoEvaluationRouter.get("/coordinadorDiligenciar",checkUserAccess(3),showCoordinadorDiligenciar);
autoEvaluationRouter.get("/coordinadorDiligenciarAutoevaluacionView/:autoevaluation_id", checkUserAccess(3), showAutoevaluationDiligenciar);
autoEvaluationRouter.post("/coordinadorDiligenciarAutoevaluacion/:autoevaluation_id", checkUserAccess(3), diligenciarAutoevaluation);

export default autoEvaluationRouter;