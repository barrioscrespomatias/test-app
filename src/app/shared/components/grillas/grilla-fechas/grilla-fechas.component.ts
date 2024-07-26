import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Turno } from 'src/app/interfaces/turno';
import { TurnoV2Service } from 'src/app/servicios/v2/turno-v2.service';
import { FechaComponent } from '../../entidades/fecha/fecha.component';
import { CommonModule } from '@angular/common';
import { ObtenerFechasTurnosPipe } from "../../../../pipes/obtenerFechasTurnos/obtener-fechas-turnos.pipe";
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { NavComponent } from 'src/app/components/nav/nav/nav.component';

@Component({
  selector: 'app-grilla-fechas',
  standalone: true,
  imports: [FechaComponent, 
            CommonModule, 
            ObtenerFechasTurnosPipe, 
            NavComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './grilla-fechas.component.html',
  styleUrl: './grilla-fechas.component.css'
})
export class GrillaFechasComponent {
  constructor(private turnoService: TurnoV2Service,
    private translate: TranslateService,
    private router: Router,
    private firebaseService:FirebaseAuthService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.profesional = navigation?.extras?.state?.['profesional'];
    this.pacienteSeleccionado = navigation?.extras?.state?.['pacienteSeleccionado'];
  }

  @Output() messageEvent = new EventEmitter<string>();

  turnos: Turno[] = [];
  medium: string = 'round-image-medium';
  small: string = 'round-image-small';
  large: string = 'round-image-large';

  isLogged: boolean = false;
  languageEnabled: boolean = false;
  profesional: string = '';
  pacienteSeleccionado: string = '';

  turnosFiltrados: any[] = [];

  sendMessage(profesion: string) {
    this.messageEvent.emit(profesion);
  }

  ngOnInit(): void {
    this.checkLoggedIn();
    this.turnoService.buscarTurnosDisponibles(this.profesional).subscribe((t) => {
      this.turnos = t as Turno[];
      this.turnosFiltrados = this.getPrimerTurnoPorFecha(this.turnos);
    });
  }

  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }

  receiveMessage(idioma: any) {
    this.translate.setDefaultLang(idioma);
  }

  navigateToGrillaHorarios(fecha: Date) {
    this.router.navigate(['/grilla-horarios-turnos'], { state: { fecha: fecha, pacienteSeleccionado: this.pacienteSeleccionado } });
  }

  getPrimerTurnoPorFecha(turnos: any[]): any[] {
    const turnosPorFecha: { [fecha: string]: any } = {};

    turnos.forEach(turno => {
      const fecha = new Date(turno.fecha.seconds * 1000).toDateString();
      if (!turnosPorFecha[fecha]) {
        turnosPorFecha[fecha] = turno;
      }
    });

    return Object.values(turnosPorFecha);
  }
}
