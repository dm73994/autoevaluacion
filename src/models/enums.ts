export enum userRol {
    DOCENTE = 0,
    COORDINADOR = 1,
    DECANO = 2,
};

export enum docenteType {
    CATEDRA = 0,
    OCASIONAL = 1,
    PLANTA = 2,
};

export enum gender {
    MEN = 0,
    WOMEN = 1,
    OTHER = 2,
}

export enum activo {
    ACTIVO = 1,
    NOACTIVO = 0,
}
export const labor_type_ref = ['D','TD','PI','TI','AD','AS','S','E','C','OS',''];

export enum labor_type {
    DOCENCIA = 'D',
    TRABAJOSDOCENCIA = 'TD',
    PROYECTOSINVESTIGACION = 'PI',
    TRABAJOSINVESTIGACION = 'TI',
    ADMINISTRACION = 'AD',
    ASESORIA = 'AS',
    SERVICIOS = 'S',
    EXTENSION = 'E',
    CAPACITACION = 'C',
    OTROSSERVICIOS = 'OS',
}