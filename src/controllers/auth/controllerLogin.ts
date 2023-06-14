import bcryptjs from 'bcryptjs';
import { connection } from '../../database/db';
import { comparePassword, encryptPassword } from '../../utils/passwordHandler';
import { tokenSign } from '../../utils/tokenManagment';
import { Response } from 'express';
import { showCoordinadorPrincipal } from '../users/controllerUser';

export const showLogin = (req, res) => {
    res.render('login');

}
export const endSetion =(req,res) =>{
    req.session.destroy(()=>{
        res.render('login',{
            alert: true,
            alertTitle: "Cierre de sesion exitoso",
            alertMessage: "Cerrando sesion...",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
            ruta:'login'
        })
    })
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
                    res.render('login',{
                        alert:true,
                        alertTitle: "Error",
                        alertMessage:"Usuario y/o contraseñia incorrectas",
                        alertIcon:"error",
                        showConfirmButton:true,
                        timer:false,
                        ruta:'login'
                    })
                }
                else{
                    console.log('usuario valido');
                    if(result.length > 0){
                        const userIdentification = result[0].user_identification;
                        connection.query('SELECT role_id FROM user_role WHERE user_identification = ?', [userIdentification], (err2, result2) => {
                        if (err2) {
                            console.log(err)
                        } else {
                            req.session.loggedin = true;
                            const user = req.session.username = result[0].user_email;
                            if(result2[0].role_id == 1){
                                console.log('redireccionar al menu docente')
                            }
                            else if(result2[0].role_id == 2){
                                console.log('redireccionar al menu decano')
                            }
                            else if(result2[0].role_id == 3){
                                console.log('redireccionar al menu coordinador')
                                res.render('login', {
                                    alert: true,
                                    alertTitle: "Conexión exitosa",
                                    alertMessage: "!Login correcto!",
                                    alertIcon: "success",
                                    showConfirmButton: false,
                                    timer: 1500,
                                    ruta: 'coordinadorPrincipal',
                                });
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