import { Entity } from "../../principal/entity/entity";
import { Profesional } from "../../personas/profesional/profesional";

export class Especialidad extends Entity {
    listadoProfesionales?: Profesional[] = new Array();
}