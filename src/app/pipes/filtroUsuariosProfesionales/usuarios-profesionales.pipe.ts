import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usuariosProfesionales',
  standalone: true
})
export class UsuariosProfesionalesPipe implements PipeTransform {

  filtrados: any[] = [];

  transform(usuarios: any): any[] {
    this.filtrados = [];
    if (usuarios != null) {
      for (let item of usuarios) 
      {
        if (item.perfil == 'profesional') {          
          this.filtrados.push(item);
        }
      }
    }

    return this.filtrados;
  }

}
