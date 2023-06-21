import { Component, Input } from '@angular/core';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';

@Component({
  selector: 'app-calificar-atencion',
  templateUrl: './calificar-atencion.component.html',
  styleUrls: ['./calificar-atencion.component.css'],
})
export class CalificarAtencionComponent {
  //#region Propiedades
  @Input() turnoRecibido: any;
  rating: number = 5;

  //#endregion

  //#region Constructor
  constructor(private turnoService: TurnoService) {}

  //#endregion

  //#region Metodos
  CalificarAtencion() {
    this.turnoRecibido.rating = this.rating;
    this.turnoService.Modificar(this.turnoRecibido.docRef, this.turnoRecibido);
  }

  ConvertirFecha(fecha: any) {
    return new Date(fecha.seconds * 1000);
  }
  //#endregion
}
