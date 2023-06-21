import { Component, Input } from '@angular/core';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';

@Component({
  selector: 'app-ver-resena',
  templateUrl: './ver-resena.component.html',
  styleUrls: ['./ver-resena.component.css']
})
export class VerResenaComponent {
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
