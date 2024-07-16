import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuariosPacientes',
  standalone: true
})
export class FiltroUsuariosPacientesPipe implements PipeTransform {

  filtrados: any[] = [];

  transform(usuarios: any): any[] {
    this.filtrados = [];
    if (usuarios != null) {
      for (let item of usuarios) 
      {
        if (item.perfil == 'paciente') {          
          this.filtrados.push(item);
        }
      }
    }

    return this.filtrados;
  }
}