import { Result } from 'express-validator';
import { connection } from '../../database/db';
import {getAutoevaluacionesDocente,getIdPeriodo,getCodeLabor,getIdentificationUser,getAutoevaluacionesDiligenciar,getAutoevaluaciones ,insertAutoevaluacion, updateAutoevaluationByCode,getAutoevaluationByCode, getAutoevaluationCoordinaor} from '../../fachada/fachadaAutoevaluacion';
import { getUserByEmail } from '../../fachada/fachadaUsuario';
import {almacenarMensaje } from '../../observador/observadorNotificacion';
import { notificarRelizacionAutoevaluacionCoordinador } from '../notificaciones/controllerNotificaciones';
import { notificarRelizacionAutoevaluacionDocente,notificarAsignacionAutoevaluacion } from '../notificaciones/controllerNotificaciones';

export const showCoordinadorCrudAutoevaluation = (req,res) =>{
  res.render('coordinadorCrudAutoevaluacion');
}

export const coordinadorCrudAutoevaluacion = (req,res) => {
  getAutoevaluaciones((err,autoevaluaciones) =>{
      if(err){
        console.log(err)
      }
      else{
          console.log(autoevaluaciones);
          res.render('coordinadorCrudAutoevaluacion',{
            data:autoevaluaciones
          });
      }
  })
}

export const showCoordinadorCreateAutoevaluacion = async (req, res) => {
  try {
    const codes = await getCodeLabor();
    const identifications = await getIdentificationUser();
    const periods = await getIdPeriodo();
    res.render('coordinadorCreateAutoevaluacion', {
      dataIdentifications: identifications,
      dataCode: codes,
      dataPeriods: periods
    });
  } catch (err) {
    console.log(err);
  }
};

export const createAutoevaluacion = async (req, res) => {
  try {
    const codes = await getCodeLabor();
    const identifications = await getIdentificationUser();
    const periods = await getIdPeriodo();
    const { user_identification, labor_code,period_id, acto, date_init, date_finish,recomendaciones } = req.body;
    console.log(req.body)
    console.log('CONTROLLER CREATE LABOR');
    
    const autoevaluacionData = {
      user_identification: user_identification,
      labor_code:labor_code,
      period_id: period_id,
      acto: acto,
      state: 'ejecucion',
      date_init: date_init,
      date_finish: date_finish,
      activo: 1,
      recomendaciones: recomendaciones
    };
    console.log(autoevaluacionData)
    insertAutoevaluacion(autoevaluacionData, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const autoevaluacionId = result.insertId;
        notificarAsignacionAutoevaluacion(req,res,autoevaluacionId,user_identification);
        console.log('Autoevaluación registrada');
        res.render('coordinadorCreateAutoevaluacion', {
          dataIdentifications: identifications,
          dataCode: codes,
          dataPeriods: periods,
          alert: true,
          alertTitle: "Registro completado",
          alertMessage: "!Autoevaluacion registrada!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: 'coordinadorCrudAutoevaluacion'
        });
        //res.redirect('/coordinadorCrudAutoevaluacion');
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const showAutoevaluationUpdate = async(req, res) => {
  const {autoevaluation_id} = req.params;
  const codes = await getCodeLabor();
  const identifications = await getIdentificationUser();
  const periods = await getIdPeriodo();
  getAutoevaluationByCode(autoevaluation_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const autoevaluacion = result[0];
      console.log(autoevaluacion);
      res.render('coordinadorUpdateAutoevaluacion',{
        data:autoevaluacion,
        dataIdentifications: identifications,
        dataCode: codes,
        dataPeriods: periods
      });
    }
  });
};

export const updateAutoevaluation = async(req, res) => {
  const {autoevaluation_id} = req.params;
  const { user_identification, labor_code,period_id, acto,state, date_init, date_finish,activo ,recomendaciones} = req.body;
  const codes = await getCodeLabor();
  const identifications = await getIdentificationUser();
  const periods = await getIdPeriodo();
  const autoevaluacionData = {
    user_identification: user_identification,
    labor_code:labor_code,
    period_id: period_id,
    acto: acto,
    state: state,
    date_init: date_init,
    date_finish: date_finish,
    activo: activo,
    recomendaciones: recomendaciones
  };
  
  updateAutoevaluationByCode(autoevaluation_id, autoevaluacionData, (err, result) => {
    if (err) {
      getAutoevaluaciones((err,autoevaluaciones) =>{
        console.log(autoevaluaciones);
        res.render('coordinadorUpdateAutoevaluacion', {
          data:autoevaluaciones,
          dataIdentifications: identifications,
          dataCode: codes,
          dataPeriods: periods,
          alert: true,
          alertTitle: "Registro fallido",
          alertMessage: "!Error al actualizar!",
          alertIcon: "error",
          showConfirmButton: false,
          timer: 1500,
          ruta: 'coordinadorCrudAutoevaluacion'
        });
      })
    } else {
      getAutoevaluaciones((err,autoevaluaciones) =>{
        console.log(autoevaluaciones);
        res.render('coordinadorUpdateAutoevaluacion', {
          data:autoevaluaciones,
          dataIdentifications: identifications,
          dataCode: codes,
          dataPeriods: periods,
          alert: true,
          alertTitle: "Registro completado",
          alertMessage: "!Autoevaluacion actualizada!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: 'coordinadorCrudAutoevaluacion'
        });
      })
    }
  });
};

export const showCoordinadorDiligenciar = (req,res) =>{
  res.render('coordinadorDiligenciar');
}

export const coordinadorAutoevaluaciones = (req,res) => {
  const email = req.session.username; 
  getAutoevaluacionesDiligenciar(email,(err,autoevaluaciones) =>{
      if(err){
          console.log(err)
      }
      else{
          console.log(autoevaluaciones);
          res.render('coordinadorDiligenciar',{
            data:autoevaluaciones
          });
      }
  });
}

export const showAutoevaluationDiligenciar = (req, res) => {
  const {autoevaluation_id} = req.params;

  getAutoevaluationByCode(autoevaluation_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const autoevaluacion = result[0];
      console.log(autoevaluacion);
      res.render('coordinadorDiligenciarAutoevaluacion',{
        data:autoevaluacion
      });
    }
  });
};

export const diligenciarAutoevaluation = (req, res) => {
  const {autoevaluation_id} = req.params;
  const { resultados , evaluacion, sugerencias} = req.body;
  
  const autoevaluacionData = {
    resultados:resultados,
    evaluacion:evaluacion,
    sugerencias: sugerencias
  };

  updateAutoevaluationByCode(autoevaluation_id, autoevaluacionData, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      notificarRelizacionAutoevaluacionCoordinador(req,res,autoevaluation_id);
      getAutoevaluaciones((err,autoevaluaciones) =>{
        console.log(autoevaluaciones);
        res.render('coordinadorDiligenciar', {
          data:autoevaluaciones,
          alert: true,
          alertTitle: "Registro completado",
          alertMessage: "!Autoevaluacion realizada!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: 'coordinadorDiligenciarAutoevaluaciones'
        });
      })
    }
  });
};

export const showConsultarAutoevaluacionesArchivo = (req,res) => {
  res.render('docenteAutoevaluaciones');
}

export const consultarAutoevaluacionesArchivo = (req,res) => {
  const email = req.session.username;
  console.log(email)
  getAutoevaluacionesDocente(email,(err,autoevaluaciones) =>{
    if(err){
      console.log(err)
    }
    else{
        console.log(autoevaluaciones);
        res.render('docenteAutoevaluaciones',{
          data:autoevaluaciones
        });
    }
})
}

export const showDocenteDiligenciar = (req,res) =>{
  res.render('docenteDiligenciar');
}

export const docenteAutoevaluaciones = (req,res) => {
  const email = req.session.username; 
  getAutoevaluacionesDiligenciar(email,(err,autoevaluaciones) =>{
      if(err){
          console.log(err)
      }
      else{
          console.log(autoevaluaciones);
          res.render('docenteDiligenciar',{
            data:autoevaluaciones
          });
      }
  });
}

export const showDocenteAutoevaluationDiligenciar = (req, res) => {
  const {autoevaluation_id} = req.params;

  getAutoevaluationByCode(autoevaluation_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const autoevaluacion = result[0];
      console.log(autoevaluacion);
      res.render('docenteDiligenciarAutoevaluacion',{
        data:autoevaluacion
      });
    }
  });
};

export const diligenciarDocenteAutoevaluation = (req, res) => {
  const {autoevaluation_id} = req.params;
  const { resultados , evaluacion, sugerencias} = req.body;
  
  const autoevaluacionData = {
    resultados:resultados,
    evaluacion:evaluacion,
    sugerencias: sugerencias
  };

  updateAutoevaluationByCode(autoevaluation_id, autoevaluacionData, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      notificarRelizacionAutoevaluacionDocente(req,res,autoevaluation_id);
      getAutoevaluaciones((err,autoevaluaciones) =>{
        console.log(autoevaluaciones);
        res.render('docenteDiligenciarAutoevaluacion', {
          data:autoevaluaciones,
          alert: true,
          alertTitle: "Registro completado",
          alertMessage: "!Autoevaluacion realizada!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: 'docenteDiligenciar'
        });
      })
    }
  });
};

export const showDecanoAutoevaluationes = (req,res) =>{
  res.render('decanoAutoevaluaciones');
}

export const decanoAutoevaluationes = (req,res) => {
  getAutoevaluaciones((err,autoevaluaciones) =>{
      if(err){
        console.log(err)
      }
      else{
          console.log(autoevaluaciones);
          res.render('decanoAutoevaluaciones',{
            data:autoevaluaciones
          });
      }
  })
}

export const showDecanoAutoevaluationCoordinador = (req, res) => {
  res.render('decanoAutoevaluacionCoordinador');
}

export const decanoAutoevaluationCoordinador = (req, res) => {
  const coordinadorId = '1002963849';
  getAutoevaluationCoordinaor (coordinadorId,(err,autoevaluacion) =>{
    if(err){
      console.log(err);
    }
    else{
      console.log(autoevaluacion);
      res.render('decanoAutoevaluacionCoordinador',{
        data:autoevaluacion
      });
    }
  });
}

export const showAutoevaluationUpdateCoordinador = async(req, res) => {
  const {autoevaluation_id} = req.params;
  const codes = await getCodeLabor();
  const identifications = await getIdentificationUser();
  const periods = await getIdPeriodo();
  getAutoevaluationByCode(autoevaluation_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const autoevaluacion = result[0];
      console.log(autoevaluacion);
      res.render('decanoUpdateAutoevaluacionCoordinador',{
        data:autoevaluacion,
        dataIdentifications: identifications,
        dataCode: codes,
        dataPeriods: periods
      });
    }
  });
};

export const updateAutoevaluationCoordinador = async(req, res) => {
  const {autoevaluation_id} = req.params;
  const { recomendaciones , state} = req.body;
  const codes = await getCodeLabor();
  const identifications = await getIdentificationUser();
  const periods = await getIdPeriodo();
  const autoevaluacionData = {
    state:state,
    recomendaciones: recomendaciones
  };
  
  updateAutoevaluationByCode(autoevaluation_id, autoevaluacionData, (err, result) => {
    if (err) {
      getAutoevaluaciones((err,autoevaluaciones) =>{
        console.log(autoevaluaciones);
        res.render('decanoUpdateAutoevaluacionCoordinador', {
          data:autoevaluaciones,
          dataIdentifications: identifications,
          dataCode: codes,
          dataPeriods: periods,
          alert: true,
          alertTitle: "Registro fallido",
          alertMessage: "!Error al actualizar!",
          alertIcon: "error",
          showConfirmButton: false,
          timer: 1500,
          ruta: 'decanoAutoevaluacionCoordinador'
        });
      })
    } else {
      getAutoevaluaciones((err,autoevaluaciones) =>{
        console.log(autoevaluaciones);
        res.render('decanoUpdateAutoevaluacionCoordinador', {
          data:autoevaluaciones,
          dataIdentifications: identifications,
          dataCode: codes,
          dataPeriods: periods,
          alert: true,
          alertTitle: "Registro completado",
          alertMessage: "!Autoevaluacion actualizada!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: 'decanoAutoevaluacionCoordinador'
        });
      })
    }
  });
};