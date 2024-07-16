import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'especialidadesDisponibles',
  standalone: true
})
export class EspecialidadesDisponiblesPipe implements PipeTransform {
  filtrados: any[] = [];

  transform(turnos: any, especialidades: any, estado: string): any[] {
    this.filtrados = [];   

    if (turnos != null) {
      for (let item of turnos) 
      {
        if (item.estado == estado) 
        {
          if(!this.filtrados.includes(item.especialidad) && this.filtrados.length < especialidades.length){
            this.filtrados.push(item.especialidad);
          }
        }
      }
    }

    return this.filtrados;
  }
}