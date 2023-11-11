import { Pipe, PipeTransform } from '@angular/core';
import { SweetAlertService } from 'src/app/servicios/sweet-alert/sweet-alert.service';
import { Router } from '@angular/router';
import { reload } from 'firebase/auth';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'filtroTurnos',
})
export class FiltroTurnosPipe implements PipeTransform {

  datePipe: DatePipe;

  constructor(
    private sweetAlert: SweetAlertService,
    public router: Router,
  ) {this.datePipe = new DatePipe('en-US');}
  filtrados: any[] = [];

  transform(turnos: any, especialidad: string, profesional: string, estado: string, fechaSeleccionada:string): any[] {
    this.filtrados = [];

    if (turnos != null) {
      for (let item of turnos) 
      {
        if (item.especialidad == especialidad && item.profesional == profesional && item.estado == estado && fechaSeleccionada.length == 0) 
        {
          this.filtrados.push(item);
        }
        else if (item.especialidad == especialidad && item.profesional == profesional && item.estado == estado && this.MismaFecha(item.fecha,fechaSeleccionada))
        {
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


  MismaFecha(date1: any, date2: any): boolean {
    const formattedDate1 = this.FormatoFecha(date1);
    const formattedDate2 = this.FormatoFecha(date2);
    return formattedDate1.slice(0, 10) === formattedDate2.slice(0, 10);
  }

  
  FormatoFecha(fecha: any): string {
    const date = fecha ? new Date(fecha.seconds * 1000) : null;
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss') ?? '';
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
