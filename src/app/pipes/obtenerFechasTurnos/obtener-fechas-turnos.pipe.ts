import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerFechasTurnos',
  standalone: true
})
export class ObtenerFechasTurnosPipe implements PipeTransform {
  filtrados: any[] = [];
  datePipe: DatePipe;

  constructor() {
    this.datePipe = new DatePipe('en-US');
  }

  transform(turnos: any, paciente:string, profesional:string): any[] 
  {
    this.filtrados = [];

    if (turnos != null) {
      for (let item of turnos) 
      {
        //Entra por paciente
        if (paciente.length > 0 && profesional.length == 0) 
        {
          if (item.paciente == paciente && !this.filtrados.some(f => this.MismaFecha(f, item.fecha)) && item.estado != "Disponible")
          {
            this.filtrados.push(item.fecha);
          }
        }
        //Entra por profesional 
        else if (profesional.length > 0 && paciente.length == 0) 
        {
          if ( item.profesional == profesional && !this.filtrados.some(f => this.MismaFecha(f, item.fecha)) && item.estado != "Disponible") 
          {
            this.filtrados.push(item.fecha);
          }
        }
        //Entra por admin
        else if(profesional.length == 0 && paciente.length == 0)
        {
          if (!this.filtrados.some(f => this.MismaFecha(f, item.fecha)) && item.estado == "Disponible") 
          {
            this.filtrados.push(item.fecha);
          }
        }
      }
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
}
