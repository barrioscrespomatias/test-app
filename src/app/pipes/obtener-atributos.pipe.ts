import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerAtributos'
})
export class ObtenerAtributosPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
