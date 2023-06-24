import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerProfesionalPaciente'
})
export class ObtenerProfesionalPacientePipe implements PipeTransform {

  filtrados: any[] = [];

  transform(turnos: any, paciente:string): any[] {
    if (turnos != null && paciente != null) {
      for (let item of turnos) {
        if (item.profesional != '' && item.paciente == paciente && !this.filtrados.includes(item.profesional)) {    
          this.filtrados.push(item.profesional);
        }
      }
    }

    return this.filtrados;
  }

}
