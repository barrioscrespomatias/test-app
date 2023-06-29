import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTurnosHistoriaClinica'
})
export class FiltroTurnosHistoriaClinicaPipe implements PipeTransform {

  filtrados: any[] = [];

  transform(
            turnos: any,
            paciente: string,
            profesional: string,
            estado : number,
            estado_igual:boolean
  ): any[] {

    this.filtrados = [];

    if (turnos != null) 
    {
      for (let item of turnos) 
        {
          //#region Paciente y profesional
          if (paciente.length > 0 && profesional.length > 0) 
          {
            if(estado_igual)
            {
              if (item.paciente == paciente && item.profesional == profesional && item.estado == estado) 
              {
                
                this.filtrados.push(item);
              }
            }
            else
            {
              if (item.paciente == paciente && item.profesional == profesional && item.estado != estado) 
              {
                this.filtrados.push(item);
              }
            }          
          }
          //#endregion

          //#region No paciente, no profesional
          else if(profesional.length == 0 && paciente.length == 0) 
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
          //#endregion

          //#region Solo Paciente
          else if (paciente.length > 0) 
          {
            if(estado_igual)
            {
              if (item.paciente == paciente && item.estado == estado) 
              {
                this.filtrados.push(item);
              }
            }
            else
            {
              if (item.paciente == paciente && item.estado != estado) 
              {
                this.filtrados.push(item);
              }
            }          
          } 
          //#endregion

          //#region Solo Profesional
          else if (profesional.length > 0) 
          {
            
            if(estado_igual)
            {
              if (item.profesional == profesional && item.estado == estado) 
              {
                this.filtrados.push(item);
              }
            }
            else
            {
              if (item.profesional == profesional && item.estado != estado) 
              {
                this.filtrados.push(item);
              }
            }          
          }
          //#endregion
        }
      }    
    

      return this.filtrados;
  }
}
