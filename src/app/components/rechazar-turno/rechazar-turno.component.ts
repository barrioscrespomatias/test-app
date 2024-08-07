import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadoEnum } from 'src/app/enum/estadoTurnoEnum/estado-turno-enum';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';

@Component({
  selector: 'app-rechazar-turno',
  templateUrl: './rechazar-turno.component.html',
  styleUrls: ['./rechazar-turno.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RechazarTurnoComponent {

  //#region Propiedades
  @Input() turnoRecibido:any;
  form!:FormGroup;

  //#endregion

   //#region Constructor
   constructor(
    private turnoService: TurnoService,
  ) {}

  //#endregion

  //#region Hooks

  async ngOnInit() {
    
    this.form = new FormGroup({
      resena: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    });
  }

  //#endregion

    //#region Getters
    get resena() {
      return this.form.get('resena');
    }
  
    //#endregion

  //#region Metodos
    RechazarTurno(){
      this.turnoRecibido.estado = "Rechazado";
      this.turnoRecibido.resena = this.resena?.value;
      this.turnoService.Modificar(this.turnoRecibido.docRef, this.turnoRecibido);
    }

    ConvertirFecha(fecha:any){
      return new Date(fecha.seconds * 1000);
    }
  //#endregion
}
