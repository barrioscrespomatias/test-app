import { Turno } from "../../funcional/turno/turno";
import { Usuario } from "../../principal/usuario/usuario";

export class Paciente extends Usuario {
    obraSocial: string = '';
    listadoTurnos: Turno[] = new Array();    
}