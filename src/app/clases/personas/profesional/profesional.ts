import { Especialidad } from "../../funcional/especialidad/especialidad";
import { Turno } from "../../funcional/turno/turno";
import { Empleado } from "../../principal/empleado/empleado";

export class Profesional extends Empleado {
    listadoEspecialidades: Especialidad[] = new Array(); // para navegar.
    especialidadesIds: string[] = new Array();
    listadoTurnos: Turno[] = new Array(); //para navegar.
    calificacionPromedio: number = 0;
}