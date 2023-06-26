import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadoEnum } from 'src/app/enum/estadoTurnoEnum/estado-turno-enum';
import { Encuesta } from 'src/app/interfaces/encuesta';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { EspecialidadService } from 'src/app/servicios/entidades/especialidad/especialidad.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { SweetAlertService } from 'src/app/servicios/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css'],
})
export class SolicitarTurnoComponent {
  //#region Constructor
  constructor(
    private especialidadService: EspecialidadService,
    private usuarioService: UsuarioService,
    private turnoService: TurnoService,
    private firebaseService: FirebaseAuthService,
    private sweetAlert: SweetAlertService,
 
  ) {}

  //#endregion

  //#region Propiedades

  form!: FormGroup;
  usuario: any;
  isLogged: boolean = this.firebaseService.isLoggedIn;
  mail: string = this.firebaseService.userName;
  especialidades: any;
  usuarios: any;
  especialidadSeleccionada: string = '';
  profesionalSeleccionado: string = '';
  turnoSeleccionado: any;

  profesionalSeleccionadoParaTurno: any;
  turnos:any;

  //visualizador
  visualizarEspecialidades: boolean = true;
  visualizarProfesionales: boolean = false;
  visualizarTurnos: boolean = false;

  //#endregion

  //#region Hooks
  async ngOnInit() {
    this.usuarioService.getProfesional(this.mail).then((usuario: any) => {
      this.usuario = usuario;
    });

    this.usuarioService.TraerTodos().then((usuarios: any) => {
      this.usuarios = usuarios;
    });

    this.turnoService.TraerTodos().then((turnos: any) => {
      this.turnos = turnos;
    });

    this.especialidadService.TraerTodas().then((especialidades: any) => {
      this.especialidades = especialidades;
    });

    this.form = new FormGroup({
      especialidad: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      hora_inicio: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      hora_fin: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      duracion: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      dias: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    });
    // this.GenerarHorariosParaTurnos();
  }

  //#endregion

  //#region Metodos
  ObtenerValorEspecialidad(nombreEspecialidad: string) {
    this.visualizarEspecialidades = false;
    this.visualizarProfesionales = true;
    this.especialidadSeleccionada = nombreEspecialidad;
  }

  ObtenerValorProfesional(nombreProfesional: string) {
    this.visualizarProfesionales = false;
    this.visualizarTurnos = true;
    this.profesionalSeleccionado = nombreProfesional;

    // if(generacionSinErrores)

    //   else
    //   this.sweetAlert.MensajeError('No hay turnos para esta especialidad');
  

    // this.usuarioService.getProfesional(this.mail).then((profesional: any) => {
    //   this.profesionalSeleccionadoParaTurno = profesional;
    // });
  }

  ObtenerTurnoSeleccionado(turnoSeleccionado: any) {
    this.visualizarTurnos = false;
    const encuesta: Encuesta={};
    var historia_clinica: { clave: string; valor: string }[] = [];
    
    // historia_clinica = [
    //   { clave: 'Caries', valor: '4' },
    //   { clave: 'Cantidad dientes', valor: '22' },
    //   { clave: 'Limpieza', valor: 'Si' },
    // ];
    
    this.turnoSeleccionado = turnoSeleccionado;
    this.turnoSeleccionado.paciente = this.mail;
    this.turnoSeleccionado.estado = EstadoEnum.PendienteAprobacion;
    this.turnoSeleccionado.encuesta = encuesta;
    this.turnoSeleccionado.rating = 0;
    this.turnoSeleccionado.resena = '';
    this.turnoSeleccionado.diagnostico = '';
    this.turnoSeleccionado.historia_clinica = historia_clinica;
    this.turnoSeleccionado.altura = 0;
    this.turnoSeleccionado.peso = 0;
    this.turnoSeleccionado.temperatura = '0';
    this.turnoSeleccionado.preison = '';

    this.turnoService.Modificar(this.turnoSeleccionado.docRef,this.turnoSeleccionado);
  }

  ConvertirFecha(fecha:any){
    return new Date(fecha.seconds * 1000);
  }

  //#endregion
}
