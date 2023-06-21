import { EstadoEnum } from "../enum/estadoTurnoEnum/estado-turno-enum";
import { Encuesta } from "./encuesta";

export interface Turno {
    docRef?: string;
    fecha?: Date;
    especialidad:string;
    paciente?:string;
    profesional?: string;    
    estado: EstadoEnum;    
    resena?: string;    
    diagnostico?: string;    
    rating?: number;    
    encuesta?: Encuesta;    
}