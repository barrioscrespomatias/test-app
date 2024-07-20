import { Component, CUSTOM_ELEMENTS_SCHEMA, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadoEnum } from 'src/app/enum/estadoTurnoEnum/estado-turno-enum';
import { Encuesta } from 'src/app/interfaces/encuesta';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { EspecialidadService } from 'src/app/servicios/entidades/especialidad/especialidad.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { SweetAlertService } from 'src/app/servicios/sweet-alert/sweet-alert.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { slideAnimation } from '../../animation';
import SweetAlert from 'sweetalert2';
import { FiltroTurnosPipe } from 'src/app/pipes/filtroTurnos/filtro-turnos.pipe';
import { FiltroUsuariosPipe } from 'src/app/pipes/filtroUsuarios/fitro-usuarios.pipe';
import { ObtenerFechasTurnosPipe } from 'src/app/pipes/obtenerFechasTurnos/obtener-fechas-turnos.pipe';
import { EspecialidadesDisponiblesPipe } from 'src/app/pipes/especialidadesDisponibles/especialidades-disponibles.pipe';
import { ObtenerTodosLosPacientesPipe } from 'src/app/pipes/obtenerTodosLosPacientes/obtener-todos-los-pacientes.pipe';
import { NavComponent } from '../nav/nav/nav.component';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css'],
  animations: [slideAnimation],
  standalone: true,
  imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            ObtenerTodosLosPacientesPipe,
            EspecialidadesDisponiblesPipe,
            FiltroUsuariosPipe,
            FiltroTurnosPipe,
            ObtenerFechasTurnosPipe,
          ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  isLogged: boolean = false;
  

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
    this.form = new FormGroup({
      especialidad: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      hora_inicio: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      hora_fin: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      duracion: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      dias: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    });

    await this.checkLoggedIn();

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


  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['turnoRecibido'] && this.turnoRecibido) {
    // if (changes) {
    console.log(changes)
      // this.ActualizarFormulario();
    // }
  }

  //#endregion

  //#region Metodos
  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }

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

  ObtenerTurnoSeleccionado(turnoSeleccionado: any) {
    this.visualizarTurnos = false;
    const encuesta: Encuesta={};
    var historia_clinica: { clave: string; valor: string }[] = [];
      
    this.turnoSeleccionado = turnoSeleccionado;
    this.turnoSeleccionado.paciente = this.pacienteSeleccionado.length > 0 ? this.pacienteSeleccionado : this.mail;
    this.turnoSeleccionado.pacienteImagen = this.usuario.imagenPerfil1;
    this.turnoSeleccionado.pacienteNombre = this.usuario.nombre;
    this.turnoSeleccionado.pacienteApellido = this.usuario.apellido;
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
      text: 'Desea solicitar el turno en el horario seleccionado?',
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
            this.sweetAlert.MensajeExitoso('Se ha solicitado el turno exitosamente!')

            // if (this.usuario.profesionalesVisitados.indexOf(this.profesionalSeleccionado) === -1) 
            // {
            //   this.usuario.profesionalesVisitados.push(this.profesionalSeleccionado);
            //   var respuesta = this.usuarioService.Modificar(this.mail,this.usuario);
            // }            
            this.ReloadCurrentRoute();
          }      
          else{
            this.sweetAlert.MensajeError('Ha ocurrido un problema al solicitar el turno. Intente nuevamente.')
            this.ReloadCurrentRoute();
          } 
        });
      }
      else{
        this.ReloadCurrentRoute();
      }
    });
  }

  ConvertirFecha(fecha:any){
    const date = fecha ? new Date(fecha.seconds * 1000) : null;

    return this.datePipe.transform(date, 'hh:mm a') ?? '';
  }

  ReloadCurrentRoute() {
    let currentUrl = this.router.url;
    console.log(currentUrl)
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