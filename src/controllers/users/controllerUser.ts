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

export const showCoordinadorPrincipal = (req, res) => {
    res.render('coordinadorPrincipal');
}

export const coordinadorCRUDuser = (req, res) => {
    connection.query('SELECT * FROM user' , (err, users) =>{
        if(err) {
            res.json(err);
        }
        else{
            res.render('coordinadorCrudUser', {
                data: users
            });
        }
    });
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

export const showUpdateDocente = (req, res)  => {
    const {user_id} = req.params;
    connection.query('SELECT * FROM user WHERE user_id = ?',[ user_id],(err, user)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('coordinadorUpdateUser', {
                data: user[0]
            });
        }
    })
}
export const updateDocente = (req, res) => {
    try{
        const {user_id} = req.params;
        const { user_identification, ...rest } = req.body;
        const docente = rest;
        connection.query('UPDATE user SET ? WHERE user_id = ?',[docente, user_id],(err, result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('docente actualizada');
                res.redirect('/coordinadorCruduser');
            }
        })


    }catch(err){
        console.log(err);
    }
}
