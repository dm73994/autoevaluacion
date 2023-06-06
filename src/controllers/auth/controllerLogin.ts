import bcryptjs from 'bcryptjs';
import { connection } from '../../database/db';
import { comparePassword, encryptPassword } from '../../utils/passwordHandler';
import { tokenSign } from '../../utils/tokenManagment';
import { Response } from 'express';

export const showLogin = (req, res) => {
    res.render('login');
}

export const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const passwordHash = await encryptPassword(password);

        const queryResult = await new Promise<any[]>((resolve, reject) => {
            connection.query('SELECT * FROM user WHERE user_email = ?', [email], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        if (queryResult.length > 0 && comparePassword(passwordHash, queryResult[0].user_password)) {
            const token = await tokenSign(queryResult[0])
            console.log(token);
            res.set('Authorization', `Bearer <${token}>`);
            
            return res.status(200).json({
                status: "Inicio de sesión exitoso",
                info: "user logged",
                data: queryResult[0]
            });
        } 
        
        
        return res.status(500).json({
            status: 500,
            info: "Error logged in",
            data: queryResult[0]
        });
        
    } catch (err) {
        return res.status(500).json({
            status: 500,
            info: "Error logged in",
            data: err
        });
    }
};