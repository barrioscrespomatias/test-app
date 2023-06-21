import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadoEnum } from 'src/app/enum/estadoTurnoEnum/estado-turno-enum';
import { Encuesta } from 'src/app/interfaces/encuesta';
import { Turno } from 'src/app/interfaces/turno';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { EspecialidadService } from 'src/app/servicios/entidades/especialidad/especialidad.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';

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
    private firebaseService: FirebaseAuthService
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
    this.especialidadSeleccionada = nombreEspecialidad;
  }

  ObtenerValorProfesional(nombreProfesional: string) {
    this.profesionalSeleccionado = nombreProfesional;

    // this.usuarioService.getProfesional(this.mail).then((profesional: any) => {
    //   this.profesionalSeleccionadoParaTurno = profesional;
    // });
  }

  ObtenerTurnoSeleccionado(turnoSeleccionado: any) {
    const encuesta: Encuesta={}
    this.turnoSeleccionado = turnoSeleccionado;
    this.turnoSeleccionado.paciente = this.mail;
    this.turnoSeleccionado.estado = EstadoEnum.PendienteAprobacion;
    this.turnoSeleccionado.encuesta = encuesta;
    this.turnoSeleccionado.rating = 0;
    this.turnoSeleccionado.resena = '';
    this.turnoSeleccionado.diagnostico = '';

    this.turnoService.Modificar(this.turnoSeleccionado.docRef,this.turnoSeleccionado);
  }

  //#endregion
}