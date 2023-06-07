import { userRol } from "./enums";

export type User = {
    user_id: number;
    user_identification: String;
    user_name: string;
    user_lastname: string;
    user_gender: string;
    user_studies: string;
    user_email: string;
    user_password: string;
    activo: number;
    rol: userRol;
}

export type tokeInfo = {
    _id: string | number;
    roles: string | userRol;
}