import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HorarioEspecialidad } from '../interfaces/horarioEspecialidad';

@Pipe({
  name: 'horario'
})
export class HorarioPipe implements PipeTransform {

  transform(value: HorarioEspecialidad): string {
    return JSON.stringify(value, null, 2);
  }

}
