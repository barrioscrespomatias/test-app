import { Paciente } from "../../personas/paciente/paciente";
import { Profesional } from "../../personas/profesional/profesional";
import { Especialidad } from "../especialidad/especialidad";
import { Consultorio } from "../../espacioFIsico/consultorio/consultorio";
import { TipoTurnoEnum } from "../../../enum/tipoTurnoEnum/tipo-turno";
import { EstadoEnum } from "../../../enum/estadoTurnoEnum/estado-turno-enum";
import { Horario } from "../horario/horario";
import { Entity } from "../../principal/entity/entity";

export class Turno extends Entity {
    //ForeignKey
    pacienteId: string = "";    
    paciente: Paciente = new Paciente();

    //ForeignKey
    profesionalId: string = "";;
    profesional: Profesional = new Profesional();

    //ForeignKey
    especialidadId: string = "";;
    especialidad: Especialidad = new Especialidad();

    //ForeignKey
    consultorioId: string = "";;
    consultorio: Consultorio = new Consultorio();

    
    tipo: TipoTurnoEnum = 0;
    estado: EstadoEnum = 0;
    comentario: string = "";;
    resena: string = "";;
    calificacionProfesional: string = "";;
    fechaSolicitada: Date = new Date();
    horario: Horario = new Horario();
}