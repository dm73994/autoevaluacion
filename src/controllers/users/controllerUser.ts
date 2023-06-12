import { connection } from '../../database/db';
import bcryptjs from 'bcryptjs';
import { encryptPassword } from '../../utils/passwordHandler';
import { User } from '../../models/User';

export const getUsers = async(req: Request, res: Response) => {
    try {
        console.log("HEADERS")
        console.log(req.headers);
    } catch (error) {
        
    }
}

export const createDocente = async(req, res) => {
    try{
        const {identification,name,lastname,gender,email,password,studies,role_id,date_init,date_final}: any = req.body;
        let passwordHash = await encryptPassword(password);
        console.log('CONTROLLER CREATE DOCENTE');
        connection.query('INSERT INTO user SET ?', {user_identification: identification ,user_name: name,user_lastname: lastname,user_gender: gender,user_email: email, user_password: passwordHash,user_studies: studies,activo: 1}, async(err, result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('docente creado');
                connection.query('INSERT INTO user_role SET ?', {user_identification:identification , role_id:role_id,date_start:date_init , date_finish:date_final},(err, result)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log('user rol registrado');
                    }
                })
            }
        })
    }catch(err){
        console.log(err);
    }
}

export const updateDocente = (req, res) => {
    try{
        const user: User = req.body;
        const user_identification: String = user.user_identification

        Object.keys(user).forEach((key) => {
            const value = user[key];
            if (!value) {
              delete user[key];
            }
          });
        console.log(user);
        console.log('CONTROLLER UPDATE DOCENTE');

        connection.query('UPDATE user SET ? WHERE user_identification = ?',[user, user_identification],(err, result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('docente actualizada');
            }
        })

        res.status(200).json({

        });
    }catch(err){
        console.log(err);
    }
}
