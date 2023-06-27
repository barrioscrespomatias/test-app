import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerProfesionalPaciente'
})
export class ObtenerProfesionalPacientePipe implements PipeTransform {

  filtrados: any[] = [];

  transform(turnos: any, paciente:string): any[] {
    this.filtrados = [];
    if (turnos != null && paciente != null) {
      for (let item of turnos) {
        item.estado
        if (item.profesional != '' && item.paciente == paciente && !this.filtrados.includes(item.profesional) && item.estado != 0) {    
          this.filtrados.push(item.profesional);
        }
      }
    }

    return this.filtrados;
  }

}
