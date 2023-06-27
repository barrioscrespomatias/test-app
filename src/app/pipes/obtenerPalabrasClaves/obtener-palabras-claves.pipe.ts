import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerPalabrasClaves',
})
export class ObtenerPalabrasClavesPipe implements PipeTransform {
  filtrados: string[] = [];
  
  transform(turnos: any, especialidades: string[]): any[] {
    this.filtrados = [];
    if (turnos != null) 
    {
      for (let turno of turnos) 
      {
        if ( turno.historia_clinica.lenght != 0 && especialidades.includes(turno.especialidad))
        {
          for (let historia_clinica of turno.historia_clinica) 
          {
            if 
            (historia_clinica.clave != null && !this.filtrados.includes(historia_clinica.clave))
            {
              this.filtrados.push(historia_clinica.clave);
            }
          }
        }
      }
    }

    if (
      !this.filtrados.includes('Altura') &&
      !this.filtrados.includes('Peso') &&
      !this.filtrados.includes('Temperatura') &&
      !this.filtrados.includes('Presion')
    ) {
      this.filtrados.push('Altura');
      this.filtrados.push('Peso');
      this.filtrados.push('Temperatura');
      this.filtrados.push('Presion');
    }

    return this.filtrados;
  }
}
