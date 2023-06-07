import { Labor } from "../models/Labor";
import { validationResult, body, ValidationChain } from 'express-validator';
import { labor_type, labor_type_ref } from "../models/enums";
import { escape } from "mysql";

const isValidLaborType = (value: string) => {
    return Object.values(labor_type).includes(value as labor_type);
};

export const sanitizeLaborData = (req, res, next) => {
    const validationRules = [
        body('labor_id').isNumeric().optional(),
        body('labor_code').isString().optional(),
        body('labor_name').isString().isLength({max: 50}).optional(),
        body('type_labor_code').isString().custom( v => labor_type_ref.includes(v)).optional(),
        body('labor_hours').isString().optional(),
        body('activo').isInt({min: -1, max: 1}).optional(),
    ];

    // Ejecutar las reglas de validación
    Promise.all(validationRules.map(rule => rule.run(req))).then(() => {
        const errors = validationResult(req);
        console.log("ERRORES");
        console.log(errors);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });

        const labor: Labor = {
            labor_id: req.body.labor_id,
            labor_code: escape(req.body.labor_code),
            labor_name: escape(req.body.labor_name),
            labor_type_labor: req.body.labor_type_labor,
            labor_hours: escape(req.body.labor_hours),
            activo: req.body.activo,
        };
        
        req.sanitizedLabor = labor;
        next();
    });
};

export const cleanData = (object) => {
    Object.entries(object).forEach(([key, value]) => {
        if (!value)
            delete object[key];
    });
}
