import { DiaEnum } from "../../../enum/diaEnum/dia-enum";
import { Entity } from "../../principal/entity/entity";

export class Horario extends Entity {
    horaInicio: string = "";
    horaFin: Date = new Date();
    duracion: number = 0;
    dia: DiaEnum = 0;
    disponible: boolean = false;
}