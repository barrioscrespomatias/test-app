import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuariosProfesionales'
})
export class UsuariosProfesionalesPipe implements PipeTransform {

  filtrados: any[] = [];

  transform(usuarios: any): any[] {
    if (usuarios != null) {
      for (let item of usuarios) {
        if (item.perfil == 'profesional') {          
          this.filtrados.push(item);
        }
      }
    }

    return this.filtrados;
  }

}
