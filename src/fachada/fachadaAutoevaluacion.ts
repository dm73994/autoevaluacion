import { connection } from '../database/db';

export const getAutoevaluacionesDocente = (userEmail, callback) => {
  connection.query(
    `SELECT a.*, l.labor_name, l.labor_descripcion, tl.type_labor_name, u.user_name, u.user_lastname, p.period_name, l.labor_hours
     FROM autoevaluation a
     INNER JOIN labor l ON a.labor_code = l.labor_code
     INNER JOIN type_labor tl ON l.type_labor_code = tl.type_labor_code
     INNER JOIN user u ON a.user_identification = u.user_identification
     INNER JOIN period p ON a.period_id = p.period_id
     WHERE u.user_email = ? AND a.state = 'terminado'
     ORDER BY a.user_identification`,
    [userEmail],
    (err, autoevaluaciones) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, autoevaluaciones);
      }
    }
  );
};

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

export const getCodeLabor = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT labor_code FROM labor WHERE activo = 1 ORDER BY labor_code`, (err, codes) => {
      if (err) {
        reject(err);
      } else {
        resolve(codes);
      }
    });
  });
};

export const getIdentificationUser = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT  user_identification FROM user WHERE activo = 1 ORDER BY user_identification`, (err, identifications) => {
      if (err) {
        reject(err);
      } else {
        resolve(identifications);
      }
    });
  });
};

export const getIdPeriodo = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT period_id, period_name FROM period ORDER BY period_name`, (err, periods) => {
      if (err) {
        reject(err);
      } else {
        resolve(periods);
      }
    });
  });
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
    'INSERT INTO autoevaluation (user_identification, labor_code, period_id, acto, state, date_init, date_finish, activo,recomendaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)',
    [autoevaluacionData.user_identification, autoevaluacionData.labor_code, autoevaluacionData.period_id, autoevaluacionData.acto, autoevaluacionData.state, autoevaluacionData.date_init, autoevaluacionData.date_finish, autoevaluacionData.activo,autoevaluacionData.recomendaciones],
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

export const getAutoevaluationCoordinaor = (user_identification,callback) => {
  connection.query(
    `SELECT a.*, l.labor_name,l.labor_descripcion ,tl.type_labor_name, u.user_name, u.user_lastname, p.period_name ,l.labor_hours
     FROM autoevaluation a
     INNER JOIN labor l ON a.labor_code = l.labor_code
     INNER JOIN type_labor tl ON l.type_labor_code = tl.type_labor_code
     INNER JOIN user u ON a.user_identification = u.user_identification
     INNER JOIN period p ON a.period_id = p.period_id
     WHERE a.user_identification = ?`,[user_identification],
    (err, autoevaluaciones) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, autoevaluaciones);
      }
    }
  );
}