import { connection } from '../../database/db';
import { getAutoevaluacionesDiligenciar,getAutoevaluaciones ,insertAutoevaluacion, updateAutoevaluationByCode,getAutoevaluationByCode} from '../../fachada/fachadaAutoevaluacion';

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
export const showCoordinadorCreateAutoevaluacion = (req,res) =>{
  res.render('coordinadorCreateAutoevaluacion');
}
export const createAutoevaluacion = (req, res) => {
  try {
    const { user_identification, labor_code,period_id, acto, date_init, date_finish } = req.body;
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
      activo: 1
    };
    console.log(autoevaluacionData)
    insertAutoevaluacion(autoevaluacionData, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Autoevaluación registrada');
        res.render('coordinadorCreateAutoevaluacion', {
          alert: true,
          alertTitle: "Registro completado",
          alertMessage: "!Autoevaluacion registrada!",
          alertIcon: "success",
          showConfirmButton: false,
          timer: 1500,
          ruta: 'coordinadorCrudAutoevaluacion'
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const showAutoevaluationUpdate = (req, res) => {
  const {autoevaluation_id} = req.params;

  getAutoevaluationByCode(autoevaluation_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const autoevaluacion = result[0];
      console.log(autoevaluacion);
      res.render('coordinadorUpdateAutoevaluacion',{
        data:autoevaluacion
      });
    }
  });
};

export const updateAutoevaluation = (req, res) => {
  const {autoevaluation_id} = req.params;
  const { user_identification, labor_code,period_id, acto,state, date_init, date_finish,activo } = req.body;
  
  const autoevaluacionData = {
    user_identification: user_identification,
    labor_code:labor_code,
    period_id: period_id,
    acto: acto,
    state: state,
    date_init: date_init,
    date_finish: date_finish,
    activo: activo
  };
  
  updateAutoevaluationByCode(autoevaluation_id, autoevaluacionData, (err, result) => {
    if (err) {
      getAutoevaluaciones((err,autoevaluaciones) =>{
        console.log(autoevaluaciones);
        res.render('coordinadorUpdateAutoevaluacion', {
          data:autoevaluaciones,
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
  const { resultados , evaluacion} = req.body;
  
  const autoevaluacionData = {
    resultados:resultados,
    evaluacion:evaluacion
  };

  updateAutoevaluationByCode(autoevaluation_id, autoevaluacionData, (err, result) => {
    if (err) {
      console.log(err);
    } else {
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
      //res.redirect('/coordinadorDiligenciarAutoevaluaciones');
    }
  });
};




