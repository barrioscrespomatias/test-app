import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerPacientes'
})
export class ObtenerPacientesPipe implements PipeTransform {

  filtrados: any[] = [];

  transform(turnos: any, profesional:string, estado:string, estado_igual:boolean): any[] {
    this.filtrados = [];

    
    if (turnos != null) {
      for (let item of turnos) 
      {
        //#region Con profesional
        if(profesional.length > 0)
        {
          
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
        //#endregion

        //#region Sin profesional
        else 
        {
          if(estado_igual)
          {
            if (item.paciente != '' && item.profesional != '' && !this.filtrados.includes(item.paciente) && item.estado == estado) 
            { 
              this.filtrados.push(item.paciente);
            }
          }
          else
          {
            if (item.paciente != '' && item.profesional != '' && !this.filtrados.includes(item.paciente) && item.estado != estado) 
            {          
              this.filtrados.push(item.paciente);
            }
          }
        }
        //#endregion                  
      }
    }

    return this.filtrados;
  }

}
