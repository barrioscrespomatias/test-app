import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/interfaces/encuesta';
import { Turno } from 'src/app/interfaces/turno';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { EspecialidadService } from 'src/app/servicios/entidades/especialidad/especialidad.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';

@Component({
  selector: 'app-grilla-horarios',
  templateUrl: './grilla-horarios.component.html',
  styleUrls: ['./grilla-horarios.component.css'],
})
export class GrillaHorariosComponent {
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
  proximasDosSemanas: Date[] = [];
  // horariosParaTurnos: Date[] = [];
  horariosParaTurnosEspecialidad: { fecha: Date; especialidad: string }[] = [];
  turnos: any;
  especialidades: any;
  // horariosParaTurnosEspecialidad
  //#endregion

  //#region Hooks

  async ngOnInit() {
    this.usuarioService.getProfesional(this.mail).then((usuario: any) => {
      this.usuario = usuario;
    });

    this.turnoService.TraerTodos().then((turnos: any) => {
      this.turnos = turnos;
    });

    this.especialidadService.TraerTodos().then((especialidades: any) => {
      this.especialidades = especialidades;
    });

    this.form = new FormGroup({
      especialidad: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      hora_inicio: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      hora_fin: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      duracion: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      dias: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    });

    this.proximasDosSemanas = this.ObtenerProximosDias(7);

    // this.GenerarHorariosParaTurnos();
  }

  //#endregion

  //#region Getters
  get especialidad() {
    return this.form.get('especialidad');
  }

  get hora_inicio() {
    return this.form.get('hora_inicio');
  }

  get hora_fin() {
    return this.form.get('hora_fin');
  }

  get duracion() {
    return this.form.get('duracion');
  }

  get dias() {
    return this.form.get('dias');
  }

  //#endregion

  //#region Metodos

  /**
   * Crea turnos en el profesional segun la disponibilidad que ha asignado previamente.
   */
  CrearTurnos() {
    this.FechasTurnos();    

    let turnosDisponibles: Turno[] = [];
    const encuesta: Encuesta = {};

    this.horariosParaTurnosEspecialidad?.forEach(
      (horarioTurnoEspecialidad: any) => {
        const turno: Turno = {
          fecha: horarioTurnoEspecialidad.fecha,
          especialidad: horarioTurnoEspecialidad.especialidad,
          estado: 0,
          profesional: this.mail,
          rating: 0,
          encuesta: encuesta,
          diagnostico:'',
        };

        turnosDisponibles?.push(turno);
      }
    );

    // this.usuario.turnosDisponibles = turnosDisponibles;
    turnosDisponibles.forEach(turno => {
      this.turnoService.Crear(turno);
    });
    
  }

  /**
   * Genera fechas para turnos segun la disponibilidad que ha asignado previamente.
   */
  FechasTurnos() {
    this.usuario?.horarioEspecialidad?.diasHorarios.forEach((diaHora: any) => {
      this.proximasDosSemanas.forEach((fecha) => {
        if (fecha.getDay() == diaHora.dia) {
          this.GenerarHorariosParaTurnos(
            fecha,
            diaHora.duracion,
            diaHora.hora_inicio,
            diaHora.hora_fin,
            diaHora.especialidad
          );
        }
      });
    });
  }

  /**
   * Obtiene los proximos dias desde la fecha actual hasta una cantidad de dias.
   * @param cantidad : cantidad de dias a considerar
   * @returns 
   */
  ObtenerProximosDias(cantidad: number) {
    let proximosDias: Date[] = [];
    for (let i = 0; i <= cantidad; i++) {
      var date = new Date();
      date.setDate(date.getDate() + i);
      proximosDias.push(date);
    }
    return proximosDias;
  }

  /**
   * Retorna un listado de horarios en el que se generaran los turnos
   * @param fecha : Fecha en la que generara el horario
   * @param duracion : Duracion del turno
   * @param inicio : hora inicio del turno
   * @param fin : hora fin del turno
   * @param especialidad : especialidad con la que se generara el turno
   * @return : horariosParaTurnosEspecialidad
   */
  GenerarHorariosParaTurnos(
    fecha: Date,
    duracion: string,
    inicio: string,
    fin: string,
    especialidad: string
  ) {
    let cantidadTurnos =
      ((parseInt(fin) - parseInt(inicio)) * 60) / parseInt(duracion);

    // let horarios: Date[] = [];
    let horariosEspecialidad: { fecha: Date; especialidad: string }[] = [];
    let date = new Date(fecha);
    date.setHours(parseInt(inicio), 0, 0, 0);

    for (let i = 0; i < cantidadTurnos; i++) {
      // horarios.push(new Date(date), especialidad);
      horariosEspecialidad.push({
        fecha: new Date(date),
        especialidad: especialidad,
      });

      date.setMinutes(date.getMinutes() + parseInt(duracion));
    }
    // Agregar cada elemento de horariosEspecialidad a horariosParaTurnosEspecialidad
    horariosEspecialidad.forEach((horario) => {
      this.horariosParaTurnosEspecialidad.push(horario);
    });
  }

  //#endregion
}