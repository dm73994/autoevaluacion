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
    res.render('coordinadorPrincipal',{
        user: req.session.username
    });
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

export const showCreateCoordinadorCreateUser = (req, res) =>{
    res.render('coordinadorCreateUser');
}
export const createDocente = async(req, res) => {
    try {
        const { user_identification, user_name, user_lastname, user_gender, user_email, user_password, user_studies, role_id, date_start, date_finish } = req.body;
        let passwordHash = await encryptPassword(user_password);
        console.log('CONTROLLER CREATE DOCENTE');
        console.log(req.body)
        connection.query('SELECT * FROM role WHERE role_id = ?', [role_id], (err, result) => {
          if (err) {
            res.render('coordinadorCreateUser',{
                alert:true,
                alertTitle: "Error",
                alertMessage:"Error en role",
                alertIcon:"error",
                showConfirmButton:true,
                timer:false,
                ruta:'coordinadorCrudUser'
            })
          } else {
            console.log(result)
            if (result.length === 0) {
                res.render('coordinadorCreateUser',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessage:"Error, no existe el rol",
                    alertIcon:"error",
                    showConfirmButton:true,
                    timer:false,
                    ruta:'coordinadorCrudUser'
                })
            } else {
              connection.query('INSERT INTO user SET ?', { user_identification: user_identification, user_name: user_name, user_lastname: user_lastname, user_gender: user_gender, user_email: user_email, user_password: passwordHash, user_studies: user_studies, activo: 1 }, async (err, result) => {
                if (err) {
                    res.render('coordinadorCreateUser',{
                        alert:true,
                        alertTitle: "Error",
                        alertMessage:"Error en user",
                        alertIcon:"error",
                        showConfirmButton:true,
                        timer:false,
                        ruta:'coordinadorCrudUser'
                    })
                } else {
                  console.log('docente creado');
                  connection.query('INSERT INTO user_role SET ?', { user_identification: user_identification, role_id: role_id, date_start: date_start, date_finish: date_finish }, (err, result) => {
                    if (err) {
                        res.render('coordinadorCreateUser',{
                            alert:true,
                            alertTitle: "Error",
                            alertMessage:"Error en user_role",
                            alertIcon:"error",
                            showConfirmButton:true,
                            timer:false,
                            ruta:'coordinadorCrudUser'
                        })
                    } else {
                      console.log('user rol registrado');
                      res.render('coordinadorCreateUser', {
                        alert: true,
                        alertTitle: "Registro completado",
                        alertMessage: "!usuario registrado!",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: 'coordinadorCrudUser'
                    });
                    }
                  });
                }
              });
            }
          }
        });
    } catch (err) {
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
