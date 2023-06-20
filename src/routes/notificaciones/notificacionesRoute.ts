import express from 'express';
import { bandejaEntradaCoordinador,CoordinadorAlmacenarNotificacion, showBandejaEntradaCoordinador, showBandejaEntradaDocente, bandejaEntradaDocente, DecanoAlmacenarNotificacion, showBandejaEntradaDecano, bandejaEntradaDecano } from '../../controllers/notificaciones/controllerNotificaciones';
import { checkUserAccess } from '../../middleware/auth';
export const notificacionRouter = express.Router();

//docente
notificacionRouter.get("/showDocenteBandejaEntrada",checkUserAccess(1),showBandejaEntradaDocente);
notificacionRouter.get("/docenteBandejaEntrada",checkUserAccess(1),bandejaEntradaDocente);

//decano
notificacionRouter.post("/decanoEnviarNotificacion/:user_identification/:autoevaluacion_id",checkUserAccess(2),DecanoAlmacenarNotificacion)
notificacionRouter.get("/showDecanoBandejaEntrada",checkUserAccess(2),showBandejaEntradaDecano);
notificacionRouter.get("/decanoBandejaEntrada",checkUserAccess(2),bandejaEntradaDecano);
//coordinador
notificacionRouter.post("/enviarNotificacion/:user_identification/:autoevaluacion_id",checkUserAccess(3),CoordinadorAlmacenarNotificacion);
notificacionRouter.get("/showCoordinadorBandejaEntrada",checkUserAccess(3),showBandejaEntradaCoordinador);
notificacionRouter.get("/coordinadorBandejaEntrada",checkUserAccess(3),bandejaEntradaCoordinador);

export default notificacionRouter;