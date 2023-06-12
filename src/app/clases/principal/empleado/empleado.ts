import { HorarioTrabajoEnum } from "../../../enum/horarioTrabajoEnum/horario-trabajo-enum";
import { Usuario } from "../usuario/usuario";

export class Empleado extends Usuario {
    horarioTrabajo: HorarioTrabajoEnum = 0;
}