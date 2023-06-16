import { connection } from '../database/db';

export const getAutoevaluaciones = (callback) => {
  connection.query(
    `SELECT a.*, l.labor_name,l.labor_descripcion ,tl.type_labor_name, u.user_name, u.user_lastname, p.period_name ,l.labor_hours
     FROM autoevaluation a
     INNER JOIN labor l ON a.labor_code = l.labor_code
     INNER JOIN type_labor tl ON l.type_labor_code = tl.type_labor_code
     INNER JOIN user u ON a.user_identification = u.user_identification
     INNER JOIN period p ON a.period_id = p.period_id
     ORDER BY a.user_identification`,
    (err, autoevaluaciones) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, autoevaluaciones);
      }
    }
  );
};

export const getAutoevaluacionesDiligenciar = (correo, callback) => {
  connection.query(
    `SELECT a.*, l.labor_name, l.labor_descripcion, tl.type_labor_name, p.period_name, l.labor_hours, u.user_name, u.user_lastname
     FROM autoevaluation a
     INNER JOIN labor l ON a.labor_code = l.labor_code
     INNER JOIN type_labor tl ON l.type_labor_code = tl.type_labor_code
     INNER JOIN period p ON a.period_id = p.period_id
     INNER JOIN user u ON a.user_identification = u.user_identification
     WHERE u.user_email = ?
     ORDER BY a.user_identification`,
    [correo],
    (err, autoevaluaciones) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, autoevaluaciones);
      }
    }
  );
};
export const insertAutoevaluacion = (autoevaluacionData, callback) => {
  connection.query(
    'INSERT INTO autoevaluation (user_identification, labor_code, period_id, acto, state, date_init, date_finish, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [autoevaluacionData.user_identification, autoevaluacionData.labor_code, autoevaluacionData.period_id, autoevaluacionData.acto, autoevaluacionData.state, autoevaluacionData.date_init, autoevaluacionData.date_finish, autoevaluacionData.activo],
    (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }
  );
};

export const getAutoevaluationByCode = (autoevaluationId, callback) => {
  connection.query('SELECT * FROM autoevaluation WHERE autoevaluation_id = ?', [autoevaluationId], (err, result) => {
      if (err) {
          callback(err, null);
      } else {
          callback(null, result);
      }
  });
};
export const updateAutoevaluationByCode = (autoevaluationId, laborData, callback) => {
  connection.query('UPDATE autoevaluation SET ? WHERE autoevaluation_id = ?', [laborData, autoevaluationId], (err, result) => {
      if (err) {
          callback(err, null);
      } else {
          callback(null, result);
      }
  });
};