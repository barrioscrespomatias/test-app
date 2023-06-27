import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnoPorEstado'
})
export class TurnoPorEstadoPipe implements PipeTransform {
  filtrados: any[] = [];

  transform(turnos: any, estado: number, estado_igual : boolean): any[] {
    this.filtrados = [];
    if (turnos != null) {
      for (let item of turnos) 
      {
        if(estado_igual)
        {
          if (item.estado == estado) 
          {
            this.filtrados.push(item);
          }
        }
        else
        {
          if (item.estado != estado) 
          {
            this.filtrados.push(item);
          }
        }        
      }
    }

    return this.filtrados;
  }
}
