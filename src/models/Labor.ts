import { activo, labor_type, userRol } from "./enums";

export type Labor = {
    labor_id: number ;
    labor_code : String;
    labor_name: String;
    labor_type_labor : labor_type;
    labor_hours: String;
    activo: activo;
}
