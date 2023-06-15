import express from 'express';
import { createLabor, showCoordinadorCreateLabor, updateLabor } from '../../controllers/labor/controllerLabor';
import { sanitizeLaborData } from '../../middleware/sanitize';
import { showCoordinadorCrudLabor, coordinadorCrudLabor ,showUpdateLabor} from '../../controllers/labor/controllerLabor';
import { checkUserAccess } from '../../middleware/auth';
export const laborRouter = express.Router();

laborRouter.get('/coordinadorCrudLaborView',checkUserAccess(3),showCoordinadorCrudLabor);
laborRouter.post('/createLabor',checkUserAccess(3),createLabor);
laborRouter.get('/coordinadorCrudLabor',checkUserAccess(3),coordinadorCrudLabor);
laborRouter.get('/coordinadorCreateLaborView',checkUserAccess(3),showCoordinadorCreateLabor);
laborRouter.get('/coordinadorUpdateLaborView/:labor_code',checkUserAccess(3), showUpdateLabor);
laborRouter.post('/coordinadorUpdateLabor/:labor_code',checkUserAccess(3), updateLabor);
export default laborRouter;