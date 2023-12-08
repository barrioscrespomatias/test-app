import { Component, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadoEnum } from 'src/app/enum/estadoTurnoEnum/estado-turno-enum';
import { Encuesta } from 'src/app/interfaces/encuesta';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { EspecialidadService } from 'src/app/servicios/entidades/especialidad/especialidad.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { SweetAlertService } from 'src/app/servicios/sweet-alert/sweet-alert.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { slideAnimation } from '../../animation';
import SweetAlert from 'sweetalert2';
import { Paciente } from 'src/app/interfaces/paciente';
import { Profesional } from 'src/app/interfaces/profesional';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css'],
  animations: [slideAnimation]
})
export class SolicitarTurnoComponent {
  //#region Constructor
  constructor(
    private especialidadService: EspecialidadService,
    private usuarioService: UsuarioService,
    private turnoService: TurnoService,
    private firebaseService: FirebaseAuthService,
    private sweetAlert: SweetAlertService,
    public router: Router,
 
  ) {}

  //#endregion

  estadoActual: string = 'estadoInicial';

  cambiarEstado() {
    this.estadoActual = 'estadoFinal';
  }

  //#region Propiedades

  form!: FormGroup;
  usuario: any;
  mail: string = this.firebaseService.userName;
  especialidades: any;
  usuarios: any;
  especialidadSeleccionada: string = '';
  profesionalSeleccionado: string = '';
  pacienteSeleccionado: string = '';
  turnoSeleccionado: any;

  profesionalSeleccionadoParaTurno: any;
  turnos:any;

  pacienteDelTurno:any;
  profesionalDelTurno:any;

  //visualizador
  visualizarEspecialidades: boolean = true;
  visualizarProfesionales: boolean = false;
  visualizarFechasDisponibles: boolean = false;
  visualizarTurnos: boolean = false;

  fechaSeleccionada:string = '';
  datePipe = new DatePipe('en-US');
  //#endregion

  //#region Hooks
  async ngOnInit() {
    this.usuarioService.getUsuario(this.mail).then((usuario: any) => {
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
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['turnoRecibido'] && this.turnoRecibido) {
    // if (changes) {
    // console.log(changes)
      // this.ActualizarFormulario();
    // }
  }

  //#endregion

  //#region Metodos
  ObtenerValorEspecialidad(nombreEspecialidad: string) {
    this.visualizarEspecialidades = false;


    if(nombreEspecialidad.length > 0)
    {
      this.visualizarProfesionales = true;
      this.especialidadSeleccionada = nombreEspecialidad;
    }
  }

  
  ObtenerPacienteSeleccionado(emailPaciente:string){
    this.pacienteSeleccionado = emailPaciente;    
  }

  ObtenerValorProfesional(nombreProfesional: string) {
    this.visualizarProfesionales = false;
    this.visualizarFechasDisponibles = true;
    this.profesionalSeleccionado = nombreProfesional;
  }

  ObtenerValorFechaSeleccionada(fehcaSeleccionada: string) {
    this.visualizarFechasDisponibles = false;
    this.visualizarTurnos = true;
    this.fechaSeleccionada = fehcaSeleccionada;
  }

  async ObtenerTurnoSeleccionado(turnoSeleccionado: any) {

    console.log(turnoSeleccionado);
    this.visualizarTurnos = false;
    const encuesta: Encuesta={};
    var iPaciente: Paciente={};
    var iProfesional: Profesional={};

    (await this.usuarioService.Buscar("docRef", this.pacienteSeleccionado.length > 0 ? this.pacienteSeleccionado : this.mail)).subscribe(async pacienteTurno => {
      this.pacienteDelTurno = pacienteTurno;

      (await this.usuarioService.Buscar("docRef", turnoSeleccionado.profesional)).subscribe(profesionalTurno => {
        this.profesionalDelTurno = profesionalTurno;

        if(pacienteTurno != undefined && profesionalTurno != undefined){
            var iPaciente: Paciente={
              nombre : pacienteTurno[0].nombre,
              apellido: pacienteTurno[0].apellido,
              dni: pacienteTurno[0].dni,
              docRef: pacienteTurno[0].docRef,
              imagenPerfil1: pacienteTurno[0].imagenPerfil1,
            };

            var iProfesional: Profesional={
              nombre : profesionalTurno[0].nombre,
              apellido: profesionalTurno[0].apellido,
              dni: profesionalTurno[0].dni,
              docRef: profesionalTurno[0].docRef,
              imagenPerfil1: profesionalTurno[0].imagenPerfil1,
              especialidades: profesionalTurno[0].especialidades,
            };

            var historia_clinica: { clave: string; valor: string }[] = [];
    
            this.turnoSeleccionado = turnoSeleccionado;
            this.turnoSeleccionado.paciente = this.pacienteSeleccionado.length > 0 ? this.pacienteSeleccionado : this.mail;
            this.turnoSeleccionado.iPaciente = iPaciente;
            this.turnoSeleccionado.iProfesional = iProfesional;
            this.turnoSeleccionado.estado = "Pendiente de aprobacion";
            this.turnoSeleccionado.encuesta = encuesta;
            this.turnoSeleccionado.rating = 0;
            this.turnoSeleccionado.resena = '';
            this.turnoSeleccionado.diagnostico = '';
            this.turnoSeleccionado.historia_clinica = historia_clinica;
            this.turnoSeleccionado.altura = 0;
            this.turnoSeleccionado.peso = 0;
            this.turnoSeleccionado.temperatura = '0';
            this.turnoSeleccionado.presion = '';


            SweetAlert.fire({
              title: 'Confirmar turno.',
              text: 'Desea confirmar el turno en el horario seleccionado?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmar',
              cancelButtonText: 'Cancelar',
            }).then((result) => {
              if (result.isConfirmed) {
                var solicitarTurno = this.turnoService.Modificar(this.turnoSeleccionado.docRef,this.turnoSeleccionado);
                solicitarTurno.then((response) => {
                  if (response.valido) {          
                    this.sweetAlert.MensajeExitoso('Se ha asignado el turno exitosamente!')
                    this.ReloadCurrentRoute();
                  }      
                  else{
                    this.sweetAlert.MensajeError('Ha ocurrido un problema al asignar el turno. Intente nuevamente.')
                    this.ReloadCurrentRoute();
                  } 
                });
              }
              else{
                this.ReloadCurrentRoute();
              }
            });

        }
      });
    });
  }

  ConvertirFecha(fecha:any){
    const date = fecha ? new Date(fecha.seconds * 1000) : null;

    return this.datePipe.transform(date, 'hh:mm a') ?? '';
  }

  ReloadCurrentRoute() {
    let currentUrl = this.router.url;
    // console.log(currentUrl)
    this.router.navigateByUrl('/refreshPage', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  ObtenterFechaSeleccionada(fechaSeleccionada:string)
  {    
    this.fechaSeleccionada = fechaSeleccionada;
  }

  GetFormattedDate(fecha: any): string {
    const date = fecha ? new Date(fecha.seconds * 1000) : null;

    return this.datePipe.transform(date, 'dd/MM') ?? '';
  }
  //#endregion
}