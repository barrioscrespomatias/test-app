import { ManyToManyEntity } from "../../principal/manyToManyEntity/many-to-many-entity";

export class EspecialidadProfesionalMtm extends ManyToManyEntity {
    especialidadId: string = '';
    profesionalId: string = '';
}