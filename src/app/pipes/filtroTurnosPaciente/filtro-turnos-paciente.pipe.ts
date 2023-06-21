import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTurnosPaciente',
})
export class FiltroTurnosPacientePipe implements PipeTransform {
  filtrados: any[] = [];

  transform(
    turnos: any,
    paciente: string,
    profesional: string,
    estado: string
  ): any[] {
    if (turnos != null) {
      for (let item of turnos) {

        if (paciente != '') {
          if (item.paciente == paciente && item.estado != estado) {
            this.filtrados.push(item);
          }
        } else if (profesional != '') {
          if (item.profesional == profesional && item.estado != estado) {
            this.filtrados.push(item);
          }
        } 
        
        
        if(profesional == '' && paciente == '') {
          if (item.estado != estado) {
            this.filtrados.push(item);
          }
        }


        // if (item.paciente == paciente && item.estado != estado) {
        //   this.filtrados.push(item);
        // }
      }
    }

    return this.filtrados;
  }
}
