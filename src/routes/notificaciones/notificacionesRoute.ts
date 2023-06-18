import express from 'express';
import { bandejaEntrada,almacenarNotificacion, showBandejaEntradaCoordinador } from '../../controllers/notificaciones/controllerNotificaciones';
import { checkUserAccess } from '../../middleware/auth';
export const notificacionRouter = express.Router();

notificacionRouter.post("/enviarNotificacion/:user_identification/:autoevaluacion_id",checkUserAccess(3),almacenarNotificacion);
notificacionRouter.get("/showCoordinadorBandejaEntrada",checkUserAccess(3),showBandejaEntradaCoordinador);
notificacionRouter.get("/coordinadorBandejaEntrada",checkUserAccess(3),bandejaEntrada);

export default notificacionRouter;