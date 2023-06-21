import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadoEnum } from 'src/app/enum/estadoTurnoEnum/estado-turno-enum';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';

@Component({
  selector: 'app-finalizar-turno',
  templateUrl: './finalizar-turno.component.html',
  styleUrls: ['./finalizar-turno.component.css']
})
export class FinalizarTurnoComponent {
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
     diagnostico: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
   });
   
 }

 //#endregion

   //#region Getters
   get resena() {
     return this.form.get('resena');
   }

   get diagnostico() {
    return this.form.get('diagnostico');
  }
 
   //#endregion

 //#region Metodos
   FinalizarTurno(){
     this.turnoRecibido.estado = EstadoEnum.Realizado;
     this.turnoRecibido.resena = this.resena?.value;
     this.turnoRecibido.diagnostico = this.diagnostico?.value;
     this.turnoService.Modificar(this.turnoRecibido.docRef, this.turnoRecibido);
   }

   ConvertirFecha(fecha:any){
     return new Date(fecha.seconds * 1000);
   }
}
