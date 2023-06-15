import { connection } from '../database/db';

export const  getUserByEmail = (email, callback) => {
    connection.query('SELECT * FROM user WHERE user_email = ? AND activo != -1', [email], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  };
  
export const getUserRole = (userIdentification, callback) => {
    connection.query('SELECT role_id FROM user_role WHERE user_identification = ?', [userIdentification], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  };