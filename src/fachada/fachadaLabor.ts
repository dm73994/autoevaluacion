import { connection } from '../database/db';

export const getLabors = (callback) => {
    connection.query(
        'SELECT tl.type_labor_id, tl.type_labor_code, tl.type_labor_name, l.labor_descripcion, l.labor_id, l.labor_code, l.labor_name, l.labor_hours, l.activo FROM type_labor tl JOIN labor l ON tl.type_labor_code = l.type_labor_code ORDER BY l.labor_code',
        (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        }
    );
};

export const insertLabor = (laborData, callback) => {
    connection.query('INSERT INTO labor SET ?', laborData, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

export const getLaborByCode = (laborCode, callback) => {
    connection.query('SELECT * FROM labor WHERE labor_code = ?', [laborCode], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

export const updateLaborByCode = (laborCode, laborData, callback) => {
    connection.query('UPDATE labor SET ? WHERE labor_code = ?', [laborData, laborCode], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};