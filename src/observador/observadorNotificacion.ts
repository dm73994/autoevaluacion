import { Result } from 'express-validator';
import { connection } from '../database/db';

export const almacenarMensaje = (mensajeData,callback) => {
    connection.query(
      'INSERT INTO notificaciones SET ?',[mensajeData],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
};

export const notificarUser = (email, callback) => {
  connection.query(
    'SELECT ' +
    'emisor.user_name AS emisor_nombre, ' +
    'emisor.user_lastname AS emisor_apellido, ' +
    'receptor.user_name AS receptor_nombre, ' +
    'receptor.user_lastname AS receptor_apellido, ' +
    'notificaciones.mensaje, ' +
    'autoevaluation.date_init, ' +
    'autoevaluation.date_finish, ' +
    'labor.labor_name, ' +
    'notificaciones.created_at ' +
    'FROM notificaciones ' +
    'JOIN user AS emisor ON notificaciones.emisor_identification = emisor.user_identification ' +
    'JOIN user AS receptor ON notificaciones.receptor_identification = receptor.user_identification ' +
    'JOIN autoevaluation ON notificaciones.autoevaluacion_id = autoevaluation.autoevaluation_id ' +
    'JOIN labor ON autoevaluation.labor_code = labor.labor_code ' +
    'WHERE receptor.user_email = ? ' +
    'ORDER BY notificaciones.created_at DESC',
    [email],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};