import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerPacientes'
})
export class ObtenerPacientesPipe implements PipeTransform {

  filtrados: any[] = [];

  transform(turnos: any, profesional:string): any[] {
    if (turnos != null) {
      for (let item of turnos) {
        if (item.paciente != '' && item.profesional == profesional && !this.filtrados.includes(item.paciente)) {          
          this.filtrados.push(item.paciente);
        }
      }
    }

    return this.filtrados;
  }

}
