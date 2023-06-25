import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerPacientes'
})
export class ObtenerPacientesPipe implements PipeTransform {

  filtrados: any[] = [];

  transform(turnos: any, profesional:string, estado:string, estado_igual:boolean): any[] {
    if (turnos != null) {
      for (let item of turnos) {
        if(estado_igual)
        {
          if (item.paciente != '' && item.profesional == profesional && !this.filtrados.includes(item.paciente) && item.estado == estado) 
          {          
            this.filtrados.push(item.paciente);
          }
        }
        else
        {
          if (item.paciente != '' && item.profesional == profesional && !this.filtrados.includes(item.paciente) && item.estado != estado) 
          {          
            this.filtrados.push(item.paciente);
          }
        }
        
      }
    }

    return this.filtrados;
  }

}
