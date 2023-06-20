import bcryptjs from 'bcryptjs';
import { connection } from '../../database/db';
import { comparePassword, encryptPassword } from '../../utils/passwordHandler';
import { tokenSign } from '../../utils/tokenManagment';
import { Response } from 'express';
import { showCoordinadorPrincipal } from '../users/controllerUser';
import {getUserByEmail,getUserRole} from '../../fachada/fachadaLogin'

export const showLogin = (req, res) => {
  res.render('login');
}

export const paginaError = (req,res) => {
  res.render('error');
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
  
      getUserByEmail(email, async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.length === 0 || !(await bcryptjs.compare(password, result[0].user_password))) {
            res.render('login', {
              alert: true,
              alertTitle: "Error",
              alertMessage: "Usuario y/o contraseña incorrectas",
              alertIcon: "error",
              showConfirmButton: true,
              timer: false,
              ruta: 'login'
            });
          } else {
            console.log('Usuario válido');
            const userIdentification = result[0].user_identification;
            getUserRole(userIdentification, async (err2, result2) => {
              if (err2) {
                console.log(err2);
              } else {
                req.session.loggedin = true;
                req.session.username = result[0].user_email;
                req.session.role = result2[0].role_id;
  
                if (result2[0].role_id == 1) {
                  console.log('Redireccionar al menú docente');
                  res.render('login', {
                    alert: true,
                    alertTitle: "Conexión exitosa",
                    alertMessage: "!Login correcto!",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'docentePrincipal',
                });
                } else if (result2[0].role_id == 2) {
                  console.log('Redireccionar al menú decano');
                  res.render('login',{
                    alert:true,
                    alertTitle: "Conexion exitosa",
                    alertMessage: "!Login correcto!",
                    alertIcon : "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'decanoPrincipal',
                  });
                } else if (result2[0].role_id == 3) {
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
      });
    } catch (err) {
      console.log(err);
    }
};