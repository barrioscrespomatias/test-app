import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerEspecialidadProfesional'
})
export class ObtenerEspecialidadProfesionalPipe implements PipeTransform {


  filtrados: any[] = [];

  transform(turnos: any, paciente:string, profesional:string): any[] {
    if (turnos != null && profesional != null) 
    {
      this.filtrados = [];
      for (let item of turnos) 
      {
        if(paciente.length > 0 && profesional.length == 0)
        {
          if (item.especialidad != '' && item.paciente == paciente && !this.filtrados.includes(item.especialidad)) 
          {    
            this.filtrados.push(item.especialidad);
          }
        }
        else if(profesional.length > 0 && paciente.length == 0)
        {
          if (item.especialidad != '' && item.profesional == profesional && !this.filtrados.includes(item.especialidad)) 
          {    
            this.filtrados.push(item.especialidad);
          }
        }
        else
        {
          if (item.especialidad != '' && !this.filtrados.includes(item.especialidad)) 
          {    
            this.filtrados.push(item.especialidad);
          }
        }          
      }
    }

    return this.filtrados;
  }
}
