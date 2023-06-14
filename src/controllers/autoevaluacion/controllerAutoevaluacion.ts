import { connection } from '../../database/db';

export const createAutoevaluacion = (req, res) => {
    try{
        const {user_id,period_id,acto,state,resultados,evaluacion}: any = req.body;
        console.log('CONTROLLER CREATE LABOR');
        connection.query('INSERT INTO autoevaluation SET ?',{user_id: user_id, period_id:period_id, acto:acto,state:state,resultados:resultados,evaluacion:evaluacion},(err, result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('autoevaluacion registrada');
            }
        })
    }catch(err){
        console.log(err);
    }
}