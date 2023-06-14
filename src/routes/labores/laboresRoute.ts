import express from 'express';
import { createLabor, showCoordinadorCreateLabor, updateLabor } from '../../controllers/labor/controllerLabor';
import { sanitizeLaborData } from '../../middleware/sanitize';
import { showCoordinadorCrudLabor, coordinadorCrudLabor ,showUpdateLabor} from '../../controllers/labor/controllerLabor';

export const laborRouter = express.Router();

laborRouter.get('/coordinadorCrudLaborView',showCoordinadorCrudLabor);
laborRouter.post('/createLabor',createLabor);
laborRouter.get('/coordinadorCrudLabor',coordinadorCrudLabor);
laborRouter.get('/coordinadorCreateLaborView',showCoordinadorCreateLabor);
laborRouter.get('/coordinadorUpdateLaborView/:labor_code', showUpdateLabor);
laborRouter.post('/coordinadorUpdateLabor/:labor_code', updateLabor);
export default laborRouter;