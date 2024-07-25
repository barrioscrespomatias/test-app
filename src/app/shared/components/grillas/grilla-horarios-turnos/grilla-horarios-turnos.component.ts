import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Turno } from 'src/app/interfaces/turno';
import { Usuario } from 'src/app/interfaces/usuario';
import { TurnoV2Service } from 'src/app/servicios/v2/turno-v2.service';
import { UsuarioV2Service } from 'src/app/servicios/v2/usuario-v2.service';
import { NavComponent } from 'src/app/components/nav/nav/nav.component';
import { HorarioTurnoComponent } from '../../entidades/horario-turno/horario-turno.component';
import { FechaService } from 'src/app/helper/fecha/fecha.service';
import { Encuesta } from 'src/app/interfaces/encuesta';
import { SweetAlertService } from 'src/app/servicios/sweet-alert/sweet-alert.service';
import SweetAlert from 'sweetalert2';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';

@Component({
  selector: 'app-grilla-horarios-turnos',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    HorarioTurnoComponent,
    NavComponent
  ],
  providers:[FechaService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './grilla-horarios-turnos.component.html',
  styleUrl: './grilla-horarios-turnos.component.css'
})
export class GrillaHorariosTurnosComponent {
  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    private usuarioService: UsuarioV2Service,
    private turnoService: TurnoV2Service,
    private translate: TranslateService,
    private router: Router,
    private fechaService:FechaService,
    private sweetAlertService:SweetAlertService,
    private firebaseService: FirebaseAuthService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.timeStamp = navigation?.extras?.state?.['fecha'];
  }

  medium: string = 'round-image-medium';
  small: string = 'round-image-small';
  large: string = 'round-image-large';

  turnos: Turno[] = [];
  isLogged: boolean = false;
  languageEnabled: boolean = false;
  path: string ='';

  currentUser:any;
  mail: string = this.firebaseService.userName;

  //#region Parametros de ruta
  timeStamp: any;
  fecha!: Date;
  //#endregion

  sendMessage(mensaje: string) {
    this.messageEvent.emit(mensaje);
  }

  async ngOnInit(): Promise<void> {
    this.currentUser = await this.usuarioService.getUsuario(this.mail);
    this.fecha = this.fechaService.timestampToDate(this.timeStamp);
    this.path = '../../assets/img/grillas/fecha.png';
    if (this.fecha) {
      this.turnoService.traerTurnoPorFecha(this.fecha).subscribe((t) => {
        this.turnos = t as Turno[];
      });
    }
  }

  receiveMessage(idioma: string) {
    this.translate.setDefaultLang(idioma);
  }

  AsignarTurno(turno:Turno){
    const encuesta: Encuesta={};
    var historia_clinica: { clave: string; valor: string }[] = [];
      
    turno = turno;
    // turno.paciente = this.pacienteSeleccionado.length > 0 ? this.pacienteSeleccionado : this.mail;
    turno.paciente = this.currentUser.mail;
    turno.pacienteImagen = this.currentUser.imagenPerfil1;
    turno.pacienteNombre = this.currentUser.nombre;
    turno.pacienteApellido = this.currentUser.apellido;
    turno.estado = "Pendiente de aprobacion";
    turno.encuesta = encuesta;
    turno.rating = 0;
    turno.resena = '';
    turno.diagnostico = '';
    turno.historia_clinica = historia_clinica;
    turno.altura = 0;
    turno.peso = 0;
    turno.temperatura = 0;
    turno.presion = '';

    SweetAlert.fire({
      title: 'Confirmar turno.',
      text: 'Desea solicitar el turno en el horario seleccionado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this.turnoService.modificar(turno).then(async (result) => {          
            this.sweetAlertService.MensajeExitoso('Se ha solicitado el turno exitosamente!')
        });
      }
    });
  }
}
