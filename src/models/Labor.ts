import { activo, labor_type, userRol } from "./enums";

export type User = {
    labor_id: number ;
    labor_code : String;
    labor_name: String;
    labor_type_labor : labor_type;
    labor_hours: String;
    labor_activo: activo;
}