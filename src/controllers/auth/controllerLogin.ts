import bcryptjs from 'bcryptjs';
import { connection } from '../../database/db';
import { comparePassword, encryptPassword } from '../../utils/passwordHandler';
import { tokenSign } from '../../utils/tokenManagment';
import { Response } from 'express';
import { showCoordinadorPrincipal } from '../users/controllerUser';

export const showLogin = (req, res) => {
    res.render('login');
}

export const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const passwordHash = await encryptPassword(password);

        connection.query('SELECT * FROM user WHERE user_email = ?', [email], async(err, result) => {
            if (err) {
                console.log(err);
            } else {
                if(result.length == 0 || !(await bcryptjs.compare(password, result[0].user_password))){
                    console.log('usuario no valido');
                }
                else{
                    console.log('usuario valido');
                    if(result.length > 0){
                        const userIdentification = result[0].user_identification;
                        connection.query('SELECT role_id FROM user_role WHERE user_identification = ?', [userIdentification], (err2, result2) => {
                        if (err2) {
                            console.log(err)
                        } else {
                            if(result2[0].role_id == 1){
                                console.log('redireccionar al menu docente')
                            }
                            else if(result2[0].role_id == 2){
                                console.log('redireccionar al menu decano')
                            }
                            else if(result2[0].role_id == 3){
                                console.log('redireccionar al menu coordinador')
                                showCoordinadorPrincipal(req,res);
                            }
                        }
                        });
                    }   
                }
            }
        });
    } catch (err) {
        
    }
};