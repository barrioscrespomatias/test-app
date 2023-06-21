import { Component, Input } from '@angular/core';
import { EstadoEnum } from 'src/app/enum/estadoTurnoEnum/estado-turno-enum';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';

@Component({
  selector: 'app-aceptar-turno',
  templateUrl: './aceptar-turno.component.html',
  styleUrls: ['./aceptar-turno.component.css']
})
export class AceptarTurnoComponent {
  //#region Propiedades
  @Input() turnoRecibido:any;

  //#endregion

   //#region Constructor
   constructor(
    private turnoService: TurnoService,
  ) {}

  //#endregion


  //#region Metodos
    AceptarTurno(){
      this.turnoRecibido.estado = EstadoEnum.Aceptado;
      this.turnoService.Modificar(this.turnoRecibido.docRef, this.turnoRecibido);
    }

    ConvertirFecha(fecha:any){
      return new Date(fecha.seconds * 1000);
    }
  //#endregion
}
