import { EstadoEnum } from "../enum/estadoTurnoEnum/estado-turno-enum";

export interface Turno {
    fecha?: Date;
    especialidad:string;
    paciente?:string;
    estado: EstadoEnum;    
}