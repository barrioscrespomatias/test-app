import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerPacientes'
})
export class ObtenerPacientesPipe implements PipeTransform {

  filtrados: any[] = [];

  transform(turnos: any): any[] {
    if (turnos != null) {
      for (let item of turnos) {
        if (item.paciente != '' && !this.filtrados.includes(item.paciente)) {          
          this.filtrados.push(item.paciente);
        }
      }
    }

    return this.filtrados;
  }

}
