export interface Direccion {
    id?:                number;
    fechaCreacion?:     Date | undefined;
    fechaModificacion?: Date | undefined;
    fechaBaja?:         Date | undefined;
    calle?:             string;
    altura?:            string;
    piso?:              string;
    depto?:             string;
    localidad?:         string;
    provincia?:         string;
}
