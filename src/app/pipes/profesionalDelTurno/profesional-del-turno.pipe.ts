import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'profesionalDelTurno'
})
export class ProfesionalDelTurnoPipe implements PipeTransform {
  filtrados: any[] = [];

  transform(turnos: any, profesional: string): any[] {
    this.filtrados = [];
    if (turnos != null) {
      for (let item of turnos) 
      {
        alert(profesional)
        if (item.profesional == profesional) 
        {
          this.filtrados.push(item);
        }           
      }
    }
    return this.filtrados;
  }
}
