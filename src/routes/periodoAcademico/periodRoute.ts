import express from 'express';
import { createPeriodoAcademico, listPeriods, showCoordinadorCreatePeriod } from '../../controllers/periodoAcademico/controllerPeriodoAcademico';
import { checkUserAccess } from '../../middleware/auth';
export const periodoRouter = express.Router();

periodoRouter.get('/coordinadorListPeriods',checkUserAccess(3),listPeriods);
periodoRouter.post('/coordinadorCreatePeriods',checkUserAccess(3),createPeriodoAcademico);
periodoRouter.get('/coordinadorCreatePeriodView',checkUserAccess(3),showCoordinadorCreatePeriod)
export default periodoRouter;