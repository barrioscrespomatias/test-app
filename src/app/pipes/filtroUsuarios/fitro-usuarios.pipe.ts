import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuarios',
})
export class FiltroUsuariosPipe implements PipeTransform {
  filtrados: any[] = [];

  transform(usuarios: any, especialidad: string): any[] {
    if (usuarios != null) {
      for (let item of usuarios) {
        if (item.perfil == 'profesional' && item.especialidades.includes(especialidad)) {
          this.filtrados.push(item);
        }
      }
    }

    return this.filtrados;
  }
}
