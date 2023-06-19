import { HorarioEspecialidad } from "./horarioEspecialidad";
import { Turno } from "./turno";

export interface Usuario {    
    docRefUsuarioId?: string;
    userFirebaseAuthId?: string;
    nombre: string;
    apellido: string;
    edad: string;
    dni: string;
    mail: string;
    contrasena: string;
    perfil: string;
    imagenPerfil1?: string;
    imagenPerfil2:string
    habilitado: boolean;
    obraSocial:string;
    especialidades: string[];
    horarioEspecialidad? : HorarioEspecialidad[];
    turnosDisponibles? : Turno[];
}
