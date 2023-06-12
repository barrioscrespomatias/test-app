import { Paciente } from "../../personas/paciente/paciente";
import { Entity } from "../../principal/entity/entity";

export class SalaEspera extends Entity {
    listadoPacientes: Paciente[] = new Array();
    cantidadMaximaPacientes: number = 0;
}