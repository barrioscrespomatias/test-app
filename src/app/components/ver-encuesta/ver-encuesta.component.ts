import { Component, Input } from '@angular/core';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';

@Component({
  selector: 'app-ver-encuesta',
  templateUrl: './ver-encuesta.component.html',
  styleUrls: ['./ver-encuesta.component.css']
})
export class VerEncuestaComponent {
//#region Propiedades
@Input() turnoRecibido:any;

//#endregion

 //#region Constructor
 constructor(
  private turnoService: TurnoService,
) {}

//#endregion

//#region Metodos

  ConvertirFecha(fecha:any){
    return new Date(fecha.seconds * 1000);
  }
//#endregion
}
