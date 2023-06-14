import { connection } from '../../database/db';
import { cleanData } from '../../middleware/sanitize';
import { Labor } from '../../models/Labor';
import { activo } from '../../models/enums';

export const showCoordinadorCrudLabor  = (req, res) => {
    res.render('coordinadorCrudLabor')
}

export const coordinadorCrudLabor = (req, res) => {
    connection.query('SELECT tl.type_labor_id, tl.type_labor_code, tl.type_labor_name, l.labor_id, l.labor_code, l.labor_name, l.labor_hours, l.activo FROM type_labor tl JOIN labor l ON tl.type_labor_code = l.type_labor_code', (err, results) => {
        if (err) {
            res.json(err);
        } else {
            console.log(results);
            res.render('coordinadorCrudLabor', {
                data: results
            });
        }
    });
};

export const showCoordinadorCreateLabor  = (req, res) => {
    res.render('coordinadorCreateLabor')
}
export const createLabor = (req, res) => {
    try{
        const {labor_code,labor_name,type_labor_code,labor_hours}: any = req.body;
        console.log('CONTROLLER CREATE LABOR');
        connection.query('INSERT INTO labor SET ?', {labor_code: labor_code ,labor_name: labor_name,type_labor_code: type_labor_code,labor_hours: labor_hours,activo: 1},(err, result)=>{
            if(err){
                res.render('coordinadorCreateLabor',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessage:"Error en labor",
                    alertIcon:"error",
                    showConfirmButton:true,
                    timer:false,
                    ruta:'coordinadorCrudLabor'
                })
            }
            else{
                console.log('labor registrada');
                res.render('coordinadorCreateLabor', {
                    alert: true,
                    alertTitle: "Registro completado",
                    alertMessage: "!labor registrado!",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'coordinadorCrudLabor'
                });
                //res.redirect('/coordinadorCrudLabor');
            }
        })
    }catch(err){
        console.log(err);
    }
}

export const showUpdateLabor = (req, res) => {
    const { labor_code } = req.params;
    connection.query(
        'SELECT * FROM labor WHERE labor_code = ?',
        [labor_code],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                const labor = result[0];
                console.log(labor)
                res.render('coordinadorUpdateLabor', {
                    data: labor
                });
            }
        }
    );
};
export const updateLabor = (req, res) => {
    try {
        const {labor_code} = req.params;
        const { labor_name, type_labor_code, labor_hours, activo } = req.body;

        const labor = {
            labor_name,
            type_labor_code,
            labor_hours,
            activo
        };

        connection.query('UPDATE labor SET ? WHERE labor_code = ?', [labor, labor_code], (err, result) => {
            if (err) {
                console.log(err);
                res.send('Error al actualizar la labor');
            } else {
                console.log('Labor actualizada');
                res.redirect('/coordinadorCrudLabor');
            }
        });
    } catch (err) {
        console.log(err);
    }
};
