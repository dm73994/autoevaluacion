import bcryptjs from 'bcryptjs';
import { connection } from '../../database/db';
import { comparePassword, encryptPassword } from '../../utils/passwordHandler';
import { tokenSign } from '../../utils/tokenManagment';

export const showLogin = (req, res) => {
    res.render('login');
}

export const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const passwordHash = await encryptPassword(password);
        console.log("as");
        const queryResult = await new Promise<any[]>((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE user_email = ?', [email], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });


        if (queryResult.length > 0 && comparePassword(passwordHash, queryResult[0].password)) {
            const token = await tokenSign(queryResult[0])
            req.session.loggedin = true;
            req.session.email = queryResult[0].email;

            return res.json({
                data: queryResult,
                status: "SUCCESS"
            });
        } 

        return res.json({
            data: queryResult,
            status: "ERROR"
        });
        
    } catch (err) {
        return res.json({
            data: err,
            status: "ERROR"
        });
    }
};