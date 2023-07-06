import { Pipe, PipeTransform } from '@angular/core';
import { SweetAlertService } from 'src/app/servicios/sweet-alert/sweet-alert.service';
import { Router } from '@angular/router';
import { reload } from 'firebase/auth';

@Pipe({
  name: 'filtroTurnos',
})
export class FiltroTurnosPipe implements PipeTransform {

  constructor(
    private sweetAlert: SweetAlertService,
    public router: Router,
  ) {}
  filtrados: any[] = [];

  transform(turnos: any, especialidad: string, profesional: string, estado: string): any[] {
    this.filtrados = [];
    if (turnos != null) {
      for (let item of turnos) {
        if (
          item.especialidad == especialidad &&
          item.profesional == profesional &&
          item.estado == estado
        ) {
          this.filtrados.push(item);
        }
      }
    }

    if(this.filtrados.length == 0 && turnos != null){
      this.sweetAlert.MensajeError('No existen turnos del profesional')
      this.reloadCurrentRoute();
    }
    return this.filtrados;
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
