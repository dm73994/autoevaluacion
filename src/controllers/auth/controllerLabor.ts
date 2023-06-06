import { connection } from '../../database/db';

export const createLabor = (req, res) => {
    try{
        const {labor_code,labor_name,type_labor_code,labor_hours}: any = req.body;
        console.log('CONTROLLER CREATE LABOR')
        connection.query('INSERT INTO labor SET ?', {labor_code: labor_code ,labor_name: labor_name,type_labor_code: type_labor_code,labor_hours: labor_hours},(err, result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('labor registrada');
            }
        })
    }catch(err){
        console.log(err);
    }

}