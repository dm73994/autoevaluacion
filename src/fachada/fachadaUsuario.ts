import { connection } from '../database/db';

export const getUsers = (currentUser, callback) => {
    connection.query(
        'SELECT u.*, r.*, ur.date_start, ur.date_finish FROM user u JOIN user_role ur ON u.user_identification = ur.user_identification JOIN role r ON ur.role_id = r.role_id WHERE user_email != ? ORDER BY u.user_identification',
        [currentUser],
        (err, users) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, users);
            }
        }
    );
};

export const getUserByEmail = (email,callback) => {
    connection.query(
        'SELECT user_identification FROM user WHERE user_email = ?',[email],(err,identification) =>
        {
            if(err){
                callback(err,null);
            }
            else{
                console.log('identificacion:')
                callback(null,identification);
            }
        }
    );
}

export const createUser = (userData, callback) => {
    connection.query('INSERT INTO user SET ?', userData, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
};
  
export const createUserRole = (userRoleData, callback) => {
connection.query('INSERT INTO user_role SET ?', userRoleData, (err, result) => {
    if (err) {
    callback(err, null);
    } else {
    callback(null, result);
    }
});
};

export const getUserByIdentification = (user_identification, callback) => {
    connection.query(
        'SELECT u.*, ur.date_start, ur.date_finish, ur.role_id, ur.user_role_id FROM user u JOIN user_role ur ON u.user_identification = ur.user_identification WHERE u.user_identification = ?',
        [user_identification],
        (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        }
    );
};

export const updateUser = (user_id, user, callback) => {
    connection.query('UPDATE user SET ? WHERE user_id = ?', [user, user_id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

export const updateUserRole = (user_role_id, userRole, callback) => {
    connection.query('UPDATE user_role SET ? WHERE user_role_id = ?', [userRole, user_role_id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

export const getInfoUser = (email, callback) => {
    connection.query(
        'SELECT  * FROM user WHERE user_email = ?',
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
