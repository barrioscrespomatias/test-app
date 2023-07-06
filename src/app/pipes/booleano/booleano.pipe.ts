import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleano'
})
export class BooleanoPipe implements PipeTransform {

  transform(habilitado: boolean): string {
    switch (habilitado) {
      case true:
        return 'Si';
      case false:
        return 'No';      
    }
  }

}
