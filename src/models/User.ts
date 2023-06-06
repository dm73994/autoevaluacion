import { userRol } from "./enums";

export type User = {
    id: number;
    identification: String;
    name: string;
    lastname: string;
    gender: string;
    roles: userRol[];
    studies: string;
    username: string;
    password: string;
}

export type tokeInfo = {
    _id: string | number;
    roles: string | userRol[];
}