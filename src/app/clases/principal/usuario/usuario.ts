import { PerfilEnum } from "../../../enum/perfilEnum/perfil-enum";
import { Entity } from "../entity/entity";
import { Imagen } from "../imagen/imagen";

export class Usuario extends Entity {
    edad: string = "";
    dni: string = "";
    mail: string = "";
    contrasena: string = "";
    perfil: PerfilEnum = 0; //inicializo a todos sin inicializar 0.
    listadoImagenes?: Imagen[] = new Array(); //para navegar. 
    habilitado: boolean = false;
}