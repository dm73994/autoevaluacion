import { getUserByEmail } from "../../fachada/fachadaUsuario";
import { almacenarMensaje } from "../../observador/observadorNotificacion";
import { getAutoevaluaciones } from "../../fachada/fachadaAutoevaluacion";
import { notificarUser } from "../../observador/observadorNotificacion";

export const CoordinadorAlmacenarNotificacion = (req,res) => {
  const {user_identification , autoevaluacion_id} = req.params;
  const email = req.session.username;
  getUserByEmail(email,(err,emisor_identification) =>{
    if(err){
      console.log(err);
    }
    else{
      const notificacion = {
        emisor_identification : emisor_identification[0].user_identification,
        receptor_identification : user_identification,
        mensaje:'Recuerde que debe realizar la autoevaluacion',
        autoevaluacion_id : autoevaluacion_id
      }
      almacenarMensaje(notificacion,(err,result) =>{
        if(err){
          console.log(err);
        }
        else{
          console.log(result);
          getAutoevaluaciones((err,autoevaluaciones) =>{
            if(err){
              console.log(err)
            }
            else{
                console.log(autoevaluaciones);
                res.render('coordinadorCrudAutoevaluacion', {
                  data:autoevaluaciones,
                  alert: true,
                  alertTitle: "Registro completado",
                  alertMessage: "!Notificacion enviada!",
                  alertIcon: "success",
                  showConfirmButton: false,
                  timer: 1500,
                  ruta: 'coordinadorCrudAutoevaluacion'
                });
            }
        })}
      })
    }
  });
}

export const notificarAsignacionAutoevaluacion = (req,res,autoevaluacion_id,user_identification) => {
  const userIdentificationRecep = user_identification;
  const email = req.session.username;
  getUserByEmail(email,(err,emisor_identification) =>{
    if(err){
      console.log(err);
    }
    else{
      const notificacion = {
        emisor_identification : emisor_identification[0].user_identification,
        receptor_identification : userIdentificationRecep,
        mensaje:'Se le ha asignado una autoevaluacion',
        autoevaluacion_id : autoevaluacion_id
      }
      almacenarMensaje(notificacion,(err,result) =>{
        if(err){
          console.log(err);
        }
        else{
          console.log(result);
          getAutoevaluaciones((err,autoevaluaciones) =>{
            if(err){
              console.log(err)
            }
            else{
                console.log(autoevaluaciones);
            }
        })}
      })
    }
  });
}

export const notificarRelizacionAutoevaluacionCoordinador = (req,res,autoevaluacion_id) => {
  const user_identification = '1006';
  const email = req.session.username;
  getUserByEmail(email,(err,emisor_identification) =>{
    if(err){
      console.log(err);
    }
    else{
      const notificacion = {
        emisor_identification : emisor_identification[0].user_identification,
        receptor_identification : user_identification,
        mensaje:'Se ha realizado la autoevaluacion',
        autoevaluacion_id : autoevaluacion_id
      }
      almacenarMensaje(notificacion,(err,result) =>{
        if(err){
          console.log(err);
        }
        else{
          console.log(result);
          getAutoevaluaciones((err,autoevaluaciones) =>{
            if(err){
              console.log(err)
            }
            else{
                console.log(autoevaluaciones);
            }
        })}
      })
    }
  });
}

export const notificarRelizacionAutoevaluacionDocente = (req,res,autoevaluacion_id) => {
  const user_identification = '1002963849';
  const email = req.session.username;
  getUserByEmail(email,(err,emisor_identification) =>{
    if(err){
      console.log(err);
    }
    else{
      const notificacion = {
        emisor_identification : emisor_identification[0].user_identification,
        receptor_identification : user_identification,
        mensaje:'Se ha realizado la autoevaluacion',
        autoevaluacion_id : autoevaluacion_id
      }
      almacenarMensaje(notificacion,(err,result) =>{
        if(err){
          console.log(err);
        }
        else{
          console.log(result);
          getAutoevaluaciones((err,autoevaluaciones) =>{
            if(err){
              console.log(err)
            }
            else{
              console.log(autoevaluaciones);
            }
        })}
      })
    }
  });
}

export const showBandejaEntradaCoordinador = (req,res) => {
  res.render('coordinadorBandejaEntrada');
}

export const bandejaEntradaCoordinador = (req,res) => {
  const email = req.session.username;
  notificarUser (email,(err, results) =>{
    if(err){
      console.log(err)
    } else{
      console.log(results);
      res.render('coordinadorBandejaEntrada',{
        data:results
      })
    }
  })
}

export const showBandejaEntradaDocente = (req,res) => {
  res.render('docenteBandejaEntrada');
}

export const bandejaEntradaDocente = (req,res) => {
  const email = req.session.username;
  notificarUser (email,(err, results) =>{
    if(err){
      console.log(err)
    } else{
      console.log(results);
      res.render('docenteBandejaEntrada',{
        data:results
      })
    }
  })
}

export const DecanoAlmacenarNotificacion = (req,res) => {
  const {user_identification , autoevaluacion_id} = req.params;
  const email = req.session.username;
  getUserByEmail(email,(err,emisor_identification) =>{
    if(err){
      console.log(err);
    }
    else{
      const notificacion = {
        emisor_identification : emisor_identification[0].user_identification,
        receptor_identification : user_identification,
        mensaje:'Recuerde que debe realizar la autoevaluacion',
        autoevaluacion_id : autoevaluacion_id
      }
      almacenarMensaje(notificacion,(err,result) =>{
        if(err){
          console.log(err);
        }
        else{
          console.log(result);
          getAutoevaluaciones((err,autoevaluaciones) =>{
            if(err){
              console.log(err)
            }
            else{
                console.log(autoevaluaciones);
                res.render('decanoAutoevaluacionCoordinador', {
                  data:autoevaluaciones,
                  alert: true,
                  alertTitle: "Registro completado",
                  alertMessage: "!Notificacion enviada!",
                  alertIcon: "success",
                  showConfirmButton: false,
                  timer: 1500,
                  ruta: 'decanoAutoevaluacionCoordinador'
                });
            }
        })}
      })
    }
  });
}

export const showBandejaEntradaDecano = (req,res) => {
  res.render('decanoBandejaEntrada');
}

export const bandejaEntradaDecano = (req,res) => {
  const email = req.session.username;
  notificarUser (email,(err, results) =>{
    if(err){
      console.log(err)
    } else{
      console.log(results);
      res.render('decanoBandejaEntrada',{
        data:results
      })
    }
  })
}