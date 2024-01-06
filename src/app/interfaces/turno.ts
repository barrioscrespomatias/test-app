import { EstadoEnum } from '../enum/estadoTurnoEnum/estado-turno-enum';
import { Encuesta } from './encuesta';
import { HistoriaClinica } from './historiaClinica';

export interface Turno {
  docRef?: string;
  fecha?: Date;
  especialidad: string;
  paciente?: string;
  pacienteImagen?: string;
  pacienteNombre?: string;
  pacienteApellido?: string;
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
}
