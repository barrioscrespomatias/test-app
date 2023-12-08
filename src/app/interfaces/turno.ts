import { EstadoEnum } from '../enum/estadoTurnoEnum/estado-turno-enum';
import { Encuesta } from './encuesta';
import { HistoriaClinica } from './historiaClinica';
import { Paciente } from './paciente';
import { Profesional } from './profesional';

export interface Turno {
  docRef?: string;
  fecha?: Date;
  especialidad: string;
  paciente?: string;
  profesional?: string;
  estado: string;
  resena?: string;
  diagnostico?: string;
  rating?: number;
  encuesta?: Encuesta;
  historia_clinica?: HistoriaClinica[];
  altura?: number;
  peso?: number;
  temperatura?: number;
  presion?: string;

  iPaciente? : Paciente;
  iProfesional? : Profesional;
}
