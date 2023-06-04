import {connection} from '../../database/db';
import bcryptjs from 'bcryptjs';
import { docenteType, userRol } from '../../models/enums';
import { User } from '../../models/User';
import { encryptPassword } from '../../utils/passwordHandler';

// USUARIO QUEMADO
export const userEjemplo: User = {
    username: "cadmesa",
    password: "Abc.123",
    name: "Carlos David",
    lastname: "Mesa Martínez",
    roles: [userRol.DECANO, userRol.DOCENTE],
    id: 123,
    gender: 'Hombre',
    studies: ''
};

export const showRegister = (req, res)=>{
    res.render('register');
} 

export const register = async(req, res)=>{
    try{
        const {identification,name,lastname,gender,email,password,studies}: any = req.body;
        let passwordHash = await encryptPassword(password);
        console.log("REGISTER CONTROLADOR")
        connection.query('INSERT INTO user SET ?', {user_identification: identification ,user_name: name,user_lastname: lastname,user_gender: gender,user_email: email, user_password: passwordHash,user_studies: studies}, async(err, result)=>{
            if(err){
                console.log(err)
                res.render('register',{
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: err,
                    alertIcon: 'error',
                    showConfirmButton:false,
                    timer:false,
                    ruta:''
                })
            }
            else{
                res.render('register',{
                    alert: true,
                    alertTitle: "Registrado",
                    alertMessage: "¡Registro exitoso!",
                    alertIcon: 'success',
                    showConfirmButton:false,
                    timer:1500,
                    ruta:''
                })
            }
        })
    }catch(err){

    }
}
