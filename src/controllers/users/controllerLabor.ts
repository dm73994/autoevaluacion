import { connection } from '../../database/db';

export const createLabor = (req, res) => {
    try{
        const {labor_code,labor_name,type_labor_code,labor_hours}: any = req.body;
        console.log('CONTROLLER CREATE LABOR');
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

export const updateLabor = (req, res) => {

    try{
        const {labor_code,labor_name,type_labor_code,labor_hours}: any = req.body;
        console.log('CONTROLLER UPDATE LABOR');
        connection.query('UPDATE labor SET ? WHERE labor_code = ?',[{labor_name: labor_name,type_labor_code: type_labor_code,labor_hours: labor_hours},labor_code],(err, result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('labor actualizada');
            }
        })
    }catch(err){
        console.log(err);
    }
}

export const disableLabor = (req, res) => {

    try {
        const { labor_code, activo } = req.body;
        console.log('CONTROLLER UPDATE LABOR');
        connection.query('UPDATE labor SET activo = ? WHERE labor_code = ?', [activo, labor_code], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Labor deshabilitada');
            }
        });
    } catch (err) {
        console.log(err);
    }
}