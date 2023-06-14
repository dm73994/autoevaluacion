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
    const user = req.session.username ;
    console.log(user)
    connection.query('SELECT u.*, r.*, ur.date_start, ur.date_finish FROM user u JOIN user_role ur ON u.user_identification = ur.user_identification JOIN role r ON ur.role_id = r.role_id WHERE user_email != ?',[user], (err, users) => {
        if (err) {
            res.json(err);
        } else {
            console.log(users);
            res.render('coordinadorCrudUser', {
                data: users
            });
        }
    });
};

export const showCreateCoordinadorCreateUser = (req, res) =>{
    res.render('coordinadorCreateUser');
}
export const createDocente = async(req, res) => {
    try {
        const { user_identification, user_name, user_lastname, user_gender, user_email, user_password, user_studies,user_tipoDocente, role_id, date_start, date_finish } = req.body;
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
              connection.query('INSERT INTO user SET ?', { user_identification: user_identification, user_name: user_name, user_lastname: user_lastname, user_gender: user_gender, user_email: user_email, user_password: passwordHash, user_studies: user_studies, activo: 1,user_tipoDocente: user_tipoDocente }, async (err, result) => {
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

export const showUpdateDocente = (req, res) => {
    const { user_identification } = req.params;
    connection.query(
        'SELECT u.*, ur.date_start, ur.date_finish, ur.role_id, ur.user_role_id FROM user u JOIN user_role ur ON u.user_identification = ur.user_identification WHERE u.user_identification = ?',
        [user_identification],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                const user = result[0];
                console.log(user)
                res.render('coordinadorUpdateuser', {
                    data: user
                });
            }
        }
    );
};

export const updateDocente = (req, res) => {
    try{
        const {user_id, user_role_id} = req.params;
        const { user_name, user_lastname, user_gender, user_email, user_studies, activo, user_tipoDocente, date_start, date_finish, role_id } = req.body;

        const user = {
        user_name,
        user_lastname,
        user_gender,
        user_email,
        user_studies,
        activo,
        user_tipoDocente
        };

        const userRole = {
        date_start,
        date_finish,
        role_id
        };
        console.log(userRole)
        connection.query('UPDATE user SET ? WHERE user_id = ?', [user, user_id], (err, result) => {
            if (err) {
            console.log(err);
            } else {
            console.log('Usuario actualizado');
            }
        });
        
        connection.query('UPDATE user_role SET ? WHERE user_role_id = ?', [userRole, user_role_id], (err, result) => {
            if (err) {
            console.log(err);
            } else {
            console.log('Rol de usuario actualizado');
            }
        });
        res.redirect('/coordinadorCruduser');

    }catch(err){
        console.log(err);
    }
}
