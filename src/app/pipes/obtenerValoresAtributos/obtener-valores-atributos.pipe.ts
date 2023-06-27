import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerValoresAtributos'
})
export class ObtenerValoresAtributosPipe implements PipeTransform {

  filtrados: string[] = [];
  
  transform(turnos: any, atributo:string): any[] {
    this.filtrados = [];
    if (turnos != null) 
    {
      for (let turno of turnos) 
      {
        switch(atributo)
        {
          case 'Peso':
            if (turno.peso > 0 && !this.filtrados.includes(turno.peso))
            {
              this.filtrados.push(turno.peso);
            }
          break

          case 'Altura':
            if (turno.altura > 0 && !this.filtrados.includes(turno.altura))
            {
              this.filtrados.push(turno.altura);
            }
          break

          case 'Presion':
            if (turno.presion.length > 0 && !this.filtrados.includes(turno.presion))
            {
              this.filtrados.push(turno.presion);
            }
          break

          case 'Temperatura':
            if (turno.temperatura > 0 && !this.filtrados.includes(turno.temperatura))
            {
              this.filtrados.push(turno.temperatura);
            }
          break
        }        
      }
    }
    return this.filtrados;
  }
}
