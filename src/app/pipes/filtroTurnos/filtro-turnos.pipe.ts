import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTurnos',
})
export class FiltroTurnosPipe implements PipeTransform {
  filtrados: any[] = [];

  transform(turnos: any, especialidad: string, profesional: string, estado: string): any[] {
    this.filtrados = [];
    if (turnos != null) {
      for (let item of turnos) {
        if (
          item.especialidad == especialidad &&
          item.profesional == profesional &&
          item.estado == estado
        ) {
          this.filtrados.push(item);
        }
      }
    }

    return this.filtrados;
  }
}
