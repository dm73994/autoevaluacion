import { connection } from '../database/db';

export const getPeriods = (callback) => {
    connection.query('SELECT * FROM period', (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
};

export const createPeriod = (periodData, callback) => {
connection.query('INSERT INTO period SET ?', periodData, (err, result) => {
    if (err) {
        callback(err, null);
    } else {
        callback(null, result);
    }});
};