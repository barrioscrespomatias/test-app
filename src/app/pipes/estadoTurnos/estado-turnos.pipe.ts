import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoTurnos',
})
export class EstadoTurnosPipe implements PipeTransform {
  transform(estado: number): string {
    switch (estado) {
      case 0:
        return 'Disponible';
      case 1:
        return 'Pendiente de aprobacion';
      case 2:
        return 'Rechazado';
      case 3:
        return 'Aceptado';
      case 4:
        return 'Realizado';
      case 5:
        return 'Cancelado';
      default:
        return 'Sin estado';
    }
  }
}
