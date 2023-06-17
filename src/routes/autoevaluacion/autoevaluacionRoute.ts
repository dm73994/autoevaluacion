import express from 'express';
import { coordinadorAutoevaluaciones,showCoordinadorDiligenciar,coordinadorCrudAutoevaluacion, createAutoevaluacion, showCoordinadorCreateAutoevaluacion, showCoordinadorCrudAutoevaluation,showAutoevaluationUpdate,updateAutoevaluation, showAutoevaluationDiligenciar, diligenciarAutoevaluation } from '../../controllers/autoevaluacion/controllerAutoevaluacion';
import { checkUserAccess } from '../../middleware/auth';

export const autoEvaluationRouter = express.Router();

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