import { connection } from '../../database/db';

export const createPeriodoAcademico = (req, res) => {
    try{
        const {period_name,date_start,date_finish}: any = req.body;
        console.log('CONTROLLER CREATE LABOR');
        connection.query('INSERT INTO period SET ?', {period_name: period_name, period_dateStart:date_start, period_dateFinish:date_finish},(err, result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('periodo registrado');
            }
        })
    }catch(err){
        console.log(err);
    }
}