import { connection } from '../../database/db';
import { getPeriods,createPeriod } from '../../fachada/fachadaPeriod';

export const listPeriods = (req, res) => {
    getPeriods((err, periods) => {
      if (err) {
        res.json(err);
      }else {
            console.log(periods);
            res.render('coordinadorPeriods', {
                data:periods
            });
        }
    });
};

export const showCoordinadorCreatePeriod = (req,res) =>{
    res.render('coordinadorCreatePeriod');
}

export const createPeriodoAcademico = (req, res) => {
    const { period_name, period_dateStart, period_dateFinish } = req.body;
  
    const periodData = {
      period_name: period_name,
      period_dateStart: period_dateStart,
      period_dateFinish: period_dateFinish
    };
  
    createPeriod(periodData, (err, result) => {
      if (err) {
        console.log(err);
        res.render('coordinadorCreatePeriod', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Error al registrar el periodo",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: 'coordinadorListPeriods'
        });
      } else {
        console.log('Periodo académico creado');
        console.log(periodData)
        res.render('coordinadorCreatePeriod', {
            alert: true,
            alertTitle: "Registro completado",
            alertMessage: "!periodo registrado!",
            alertIcon: "success",
            showConfirmButton: false,
            timer: 1500,
            ruta: 'coordinadorListPeriods'
        });
      }
    });
  };