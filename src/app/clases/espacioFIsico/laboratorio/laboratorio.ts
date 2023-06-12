import { Entity } from "../../principal/entity/entity";

export class Laboratorio extends Entity {
    numero: number = 0; // si es 0, no podra ser elegido.
    disponible: boolean = false; // tampoco podra ser seleciconado
}