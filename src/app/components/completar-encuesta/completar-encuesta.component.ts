import { Component, Input } from '@angular/core';
import { EstadoEnum } from 'src/app/enum/estadoTurnoEnum/estado-turno-enum';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { Encuesta } from 'src/app/interfaces/encuesta';

@Component({
  selector: 'app-completar-encuesta',
  templateUrl: './completar-encuesta.component.html',
  styleUrls: ['./completar-encuesta.component.css'],
})
export class CompletarEncuestaComponent {
  //#region Propiedades
  @Input() turnoRecibido: any;
  facilidad_uso: string = 'Bien';
  eficiencia_obtener_turno: string = 'Bien';
  nivel_recomendacion: string = 'Bien';

  //#endregion

  //#region Constructor
  constructor(private turnoService: TurnoService) {}

  //#endregion

  //#region Metodos
  CompletarEncuesta() {
    const encuesta: Encuesta = {
        facilidad_uso: this.facilidad_uso,
        eficiencia_obtener_turno: this.eficiencia_obtener_turno,
        nivel_recomendacion: this.nivel_recomendacion,
    };

    this.turnoRecibido.encuesta = encuesta;
    this.turnoService.Modificar(this.turnoRecibido.docRef, this.turnoRecibido);
  }

  ConvertirFecha(fecha: any) {
    return new Date(fecha.seconds * 1000);
  }
  //#endregion
}
