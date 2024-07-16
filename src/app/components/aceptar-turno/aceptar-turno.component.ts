import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstadoEnum } from 'src/app/enum/estadoTurnoEnum/estado-turno-enum';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';

@Component({
  selector: 'app-aceptar-turno',
  templateUrl: './aceptar-turno.component.html',
  styleUrls: ['./aceptar-turno.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
      this.turnoRecibido.estado = "Aceptado";
      this.turnoService.Modificar(this.turnoRecibido.docRef, this.turnoRecibido);
    }

    ConvertirFecha(fecha:any){
      return new Date(fecha.seconds * 1000);
    }
  //#endregion
}
