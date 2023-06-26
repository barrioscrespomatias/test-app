import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerEspecialidadProfesional'
})
export class ObtenerEspecialidadProfesionalPipe implements PipeTransform {


  filtrados: any[] = [];

  transform(turnos: any, profesional:string): any[] {
    if (turnos != null && profesional != null) 
    {
      for (let item of turnos) 
      {
        if (item.especialidad != '' && item.profesional == profesional && !this.filtrados.includes(item.especialidad)) 
        {    
          this.filtrados.push(item.especialidad);
        }
      }
    }

    return this.filtrados;
  }

}
