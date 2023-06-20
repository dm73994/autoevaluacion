import { connection } from '../../database/db';
import { updateLaborByCode,getLaborByCode,insertLabor,getLabors} from '../../fachada/fachadaLabor';

export const showCoordinadorCrudLabor  = (req, res) => {
    res.render('coordinadorCrudLabor')
}

export const coordinadorCrudLabor = (req, res) => {
    getLabors((err, results) => {
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
    const { labor_code, labor_name, type_labor_code, labor_hours,labor_descripcion } = req.body;
    console.log('CONTROLLER CREATE LABOR');
    insertLabor({ labor_code, labor_name, type_labor_code, labor_hours , labor_descripcion }, (err, result) => {
        if (err) {
            res.render('coordinadorCreateLabor', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Error en labor",
                alertIcon: "error",
                showConfirmButton: true,
                timer: false,
                ruta: 'coordinadorCrudLabor'
            });
        } else {
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
        }
    });
};

export const showUpdateLabor = (req, res) => {
    const { labor_code } = req.params;
    getLaborByCode(labor_code, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            const labor = result[0];
            console.log(labor);
            res.render('coordinadorUpdateLabor', {
                data: labor
            });
        }
    });
};

export const updateLabor = (req, res) => {
    try {
        const { labor_code } = req.params;
        const { labor_name, type_labor_code, labor_hours, activo } = req.body;

        const labor = {
            labor_name,
            type_labor_code,
            labor_hours,
            activo
        };

        updateLaborByCode(labor_code, labor, (err, result) => {
            if (err) {
                console.log(err);
                res.send('Error al actualizar la labor');
            } else {
                console.log('Labor actualizada');
                getLabors((err, results) => {
                    if (err) {
                        res.json(err);
                    } else {
                        res.render('coordinadorUpdateLabor', {
                            data:results,
                            alert: true,
                            alertTitle: "Registro completado",
                            alertMessage: "!labor actualizada!",
                            alertIcon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                            ruta: 'coordinadorCrudLabor'
                        });
                    }
                });
                //res.redirect('/coordinadorCrudLabor');
            }
        });
    } catch (err) {
        console.log(err);
    }
};
