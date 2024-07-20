import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/interfaces/encuesta';
import { Turno } from 'src/app/interfaces/turno';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { EspecialidadService } from 'src/app/servicios/entidades/especialidad/especialidad.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { FechaService } from 'src/app/helper/fecha/fecha.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/servicios/sweet-alert/sweet-alert.service';
import { HistoriaClinica } from 'src/app/interfaces/historiaClinica';
import { DiaSemanaPipe } from 'src/app/pipes/diaSemana/dia-semana.pipe';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../../nav/nav/nav.component';

@Component({
  selector: 'app-grilla-horarios',
  templateUrl: './grilla-horarios.component.html',
  styleUrls: ['./grilla-horarios.component.css'],
  standalone: true,
  imports: [DiaSemanaPipe,
            CommonModule,
            FormsModule,
          ],
  providers: [],
  schemas: [],
})
export class GrillaHorariosComponent {
  //#region Constructor
  constructor(
    private especialidadService: EspecialidadService,
    private usuarioService: UsuarioService,
    private turnoService: TurnoService,
    private firebaseService: FirebaseAuthService,
    private router: Router,
    private sweetAlert: SweetAlertService,
    private fechaHelper: FechaService
  ) {}

  //#endregion

  //#region Propiedades
  form!: FormGroup;
  usuario: any;
  mail: string = this.firebaseService.userName;
  proximasDosSemanas: Date[] = [];
  // horariosParaTurnos: Date[] = [];
  horariosParaTurnosEspecialidad: { fecha: Date; especialidad: string }[] = [];
  turnos: any;
  especialidades: any;
  turnosDelProfesional: Turno[] = [];
  @Input() visualizarBotonConfirmar: boolean = true;
  isLogged: boolean = false;
  // horariosParaTurnosEspecialidad
  //#endregion

  //#region Hooks

  async ngOnInit() {

    this.form = new FormGroup({
      especialidad: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      hora_inicio: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      hora_fin: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      duracion: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      dias: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    });

    await this.checkLoggedIn();

    this.usuarioService.getUsuario(this.mail).then(async (usuario: any) => {
      this.usuario = usuario;

      (await this.turnoService.Buscar("profesional", usuario.docRef)).subscribe(turnos => {
        this.turnosDelProfesional = turnos;
      });

    });

    this.turnoService.TraerTodos().then((turnos: any) => {
      this.turnos = turnos;
    });

    this.especialidadService.TraerTodos().then((especialidades: any) => {
      this.especialidades = especialidades;
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
  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }

  /**
   * Crea turnos en el profesional segun la disponibilidad que ha asignado previamente.
   */
  CrearTurnos() {
    this.FechasTurnos();    

    let turnosDisponibles: Turno[] = [];
    const encuesta: Encuesta = {};
    // const historia_clinica: HistoriaClinica = {};
    var historia_clinica: HistoriaClinica[] = [];

    this.horariosParaTurnosEspecialidad = this.horariosParaTurnosEspecialidad.filter((htp) => {
      // Verifica si la fecha de objeto1 no coincide con ninguna fecha en array2
      return !this.turnosDelProfesional.some((tp) => 
              this.fechaHelper.EsIgual(this.fechaHelper.ConvertirFechaISO8601(htp.fecha),
              this.fechaHelper.ConvertirFechaFirestore(tp.fecha)));
    }); 



    this.horariosParaTurnosEspecialidad?.forEach(
      (horarioTurnoEspecialidad: any) => {
        const turno: Turno = {
          fecha: horarioTurnoEspecialidad.fecha,
          especialidad: horarioTurnoEspecialidad.especialidad,
          paciente: '',
          profesional: this.mail,
          estado: "Disponible",
          encuesta: encuesta,
          rating: 0,
          resena: '',
          diagnostico:'',
          historia_clinica: historia_clinica,
          altura: 0,
          peso: 0,
          temperatura: 0,
          presion: '',
        };

        turnosDisponibles?.push(turno);
      }
    );

    let generacionSinErrores = true;

    turnosDisponibles.forEach(turno => {
      let respuestaTurno = this.turnoService.Crear(turno);
      // respuestaTurno.then((response) => {
      //   if (response.valido) {
      //     this.alertaMensajeSucces(response.mensaje);
      //     this._usuarioService.setUserToLocalStorage(user);
      //     this.router.navigate(['usuario/login']);
      //   } else {
      //     this.alertaMensajeError(response.mensaje);
      //   }
      //   alert(response.valido);
      // });

      respuestaTurno.then((response) => {
        if (!response.valido) {          
          generacionSinErrores = false;
        }       
      });
    });

    if(generacionSinErrores)
      this.sweetAlert.MensajeExitoso('Turnos generados correctamente!');
    else
      this.sweetAlert.MensajeError('Ha ocurrido un error, intente nuevamente!');
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
