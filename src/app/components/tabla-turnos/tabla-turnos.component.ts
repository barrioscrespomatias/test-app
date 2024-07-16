import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, ViewChild, ElementRef, Renderer2, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { from } from 'rxjs';
import { Encuesta } from 'src/app/interfaces/encuesta';
import { Turno } from 'src/app/interfaces/turno';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { EspecialidadService } from 'src/app/servicios/entidades/especialidad/especialidad.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { slideAnimation } from '../../animation';
import { TurnoRepositorioService } from 'src/app/servicios/repositorio/turno/turno-repositorio.service';
import { CustomNg2SearchPipe } from 'src/app/pipes/customNg2Search/custom-ng2-search.pipe';
import { ObtenerFechasTurnosPipe } from 'src/app/pipes/obtenerFechasTurnos/obtener-fechas-turnos.pipe';
import { FormsModule } from '@angular/forms';
import { FiltroTurnosPacientePipe } from 'src/app/pipes/filtroTurnosPaciente/filtro-turnos-paciente.pipe';
import { NavComponent } from '../nav/nav/nav.component';

//animations
// import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css'],
  animations: [slideAnimation],
  standalone: true,
  imports: [CommonModule,
            FormsModule, 
            CustomNg2SearchPipe, 
            ObtenerFechasTurnosPipe, 
            FiltroTurnosPacientePipe,
            NavComponent],
  providers: [DatePipe],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class TablaTurnosComponent {
  //#region Constructor

  turnoService!: TurnoService;
  constructor(
    private especialidadService: EspecialidadService,
    private usuarioService: UsuarioService,    
    private firebaseService: FirebaseAuthService,
    private renderer:Renderer2,
    private turnoRepositoryService:TurnoRepositorioService,
    private _turnoService:TurnoService,
  ) {this.turnoService = _turnoService}

  //#endregion

  estadoActual: string = 'estadoInicial';
  isLogged: boolean = false;

  cambiarEstado() {
    this.estadoActual = 'estadoFinal';
  }

  //#region Propiedades
  usuario: any;
  mail: string = this.firebaseService.userName;
  turnos: any;
  turnosSubscription:any;
  parametrosDinamicos: any;
  especialidades: any;
  turno:any;
  searchText: any;

  // Disponible = 0,
  // PendienteAprobacion = 1, //Falta aprobacion de profeisonal
  // Rechazado = 2, //Estado final turno rechazado por el especialista.
  // Aceptado = 3,//Turno que ya fue aprobado pero todavia no ha llegado la fecha.
  // Realizado = 4, //Turno tomado, realizado y finalizado correctamente.
  // Cancelado = 5, //Turno tomado, realizado y finalizado correctamente.

  estados =  [
       { clave: 'Pendiente aprobación', valor: 1 },
       { clave: 'Rechazado', valor: 2 },
       { clave: 'Aceptado', valor: 3 },
       { clave: 'Realizado', valor: 4 },
       { clave: 'Cancelado', valor: 5 }
     ];

 
  // turnoSubscription:any;

  //  turnosSubscription:any;


  formularioSeleccionado:string = '';
  pacienteSeleccionado:string = '';
  profesionalSeleccionado:string = '';
  especialidadSeleccionada:string = '';
  atributoDinamicoSeleccionado:string = '';
  atributoPesoSeleccionado:number = 0;
  atributoAlturaSeleccionado:number = 0;
  atributoPresionSeleccionado:string = '';
  atributoTemperaturaSeleccionado:number = 0;
  estadoSeleccionado:number = -1;
  fechaSeleccionada:string = '';


  datePipe = new DatePipe('en-US');

  //#endregion

  //#region Hooks

  async ngOnInit() {

    await this.checkLoggedIn();

    this.turnosSubscription = (
      await this.turnoService.TraerTodos()
    ).subscribe((turnos) => {
      this.turnos = turnos;
    });    

    this.usuarioService.getUsuario(this.mail).then((usuario: any) => {
      this.usuario = usuario;
    });
   
    this.especialidadService.TraerTodos().then((especialidades: any) => {
      this.especialidades = especialidades;
    });
  }

  ngOnDestroy() {
    if (this.turnosSubscription) {
      this.turnosSubscription.unsubscribe();
    }
  }

  //#endregion

  //#region Metodos
  async checkLoggedIn() {
    console.log('loguea??')
    this.isLogged = await this.firebaseService.isLoggedIn();
  }
  
  ConvertirFecha(fecha:any){
    return new Date(fecha.seconds * 1000);
  }

  AbrirModal(formularioModal:string, turno:Turno) {
    this.formularioSeleccionado = formularioModal;
    this.turno = turno;
  }

  getEncuestaKeys(encuesta: Encuesta): string[] {
    return Object.keys(encuesta);
  }
  
  ObtenerFechaSeleccionada(fechaSeleccionada:string){
    this.pacienteSeleccionado = '';
    this.profesionalSeleccionado = '';
    this.especialidadSeleccionada = '';
    this.estadoSeleccionado = -1;
    this.fechaSeleccionada = fechaSeleccionada;
    this.atributoDinamicoSeleccionado = '';

    this.atributoPesoSeleccionado = 0;
    this.atributoAlturaSeleccionado = 0;
    this.atributoPresionSeleccionado = '';
    this.atributoTemperaturaSeleccionado = 0;
  }

  GetFormattedDate(fecha: any): string {
    const date = fecha ? new Date(fecha.seconds * 1000) : null;
    return this.datePipe.transform(date, 'EEEE d \'de\' MMMM yyyy') ?? '';
  }

  
  //#endregion
}
