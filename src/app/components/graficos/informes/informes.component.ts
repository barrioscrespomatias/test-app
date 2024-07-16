import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { TurnoV2Service } from 'src/app/servicios/v2/turno-v2.service';
import { UsuarioV2Service } from 'src/app/servicios/v2/usuario-v2.service';
import { GrillaUsuariosComponent } from 'src/app/shared/components/grilla-usuarios/grilla-usuarios.component';
import { ChartComponent } from '../../chart/chart.component';
import { CommonModule } from '@angular/common';
import { NgChartjsModule } from 'ng-chartjs';
import { NavComponent } from '../../nav/nav/nav.component';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';

//Swipper
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-informes',
  standalone: true,
  imports: [GrillaUsuariosComponent,
            ChartComponent, 
            CommonModule, 
            NgChartjsModule,
            NavComponent],
  providers: [UsuarioService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './informes.component.html',
  styleUrl: './informes.component.css',
})
export class InformesComponent implements OnInit{
  
  constructor(private usuarioService: UsuarioV2Service,
              private turnoService: TurnoV2Service,
              private firebaseService:FirebaseAuthService
  ){

  }

  messageInput!: any;

  //#region Graficos
  turnosPorPaciente: Turno[] = [];
  datePropertyFalse = false;
  isLogged: boolean = false;

  // Turnos por paciente
  data1: number[] = [];
  chartsLabels1: Array<string> = [];
  title1 = 'Turnos por paciente';
  type1 = 'pie';
  chartSelector1 = '.chart-1';

  //#endregion

  receiveMessage(paciente:any) {
    this.messageInput = paciente;

    this.turnoService.buscarTurnoPorPaciente(paciente).subscribe((t) => {
      this.turnosPorPaciente = t as Turno[];
      this.calcularTurnosPorPaciente();
    });
  }
  


  async ngOnInit(): Promise<void> {
    await this.checkLoggedIn();

  }

  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }

  calcularTurnosPorPaciente() {
    var turnosPorEstado = this.AgruparTurnosPorEstado(this.turnosPorPaciente);
    this.GenerarDatosTurnosPacientePorEstado(turnosPorEstado,  'chart-1')
  }

  AgruparTurnosPorEstado(turnos: Turno[]): Map<string, Turno[]> {
    const turnosAgrupados = new Map<string, Turno[]>();

    for (const turno of turnos) {
      // Utilizar la especialidad como clave
      const claveEstado = turno.estado;

      // Si la clave aún no existe en el mapa, agregar un nuevo array y el turno
      if (claveEstado !== undefined) {
        if (!turnosAgrupados.has(claveEstado)) {
          turnosAgrupados.set(claveEstado, [turno]);
        } else {
          // Si la clave ya existe, agregar el turno al array existente
          turnosAgrupados.get(claveEstado)!.push(turno);
        }
      }
    }
    return turnosAgrupados;
  }

  GenerarDatosTurnosPacientePorEstado(turnosAgrupados: Map<string, Turno[]>, chart: string) {
    const data: number[] = [];
    const chartsLabels: string[] = [];

    // Iterar sobre el mapa y llenar los chartslabels
    for (const [estado, turnos] of turnosAgrupados) {
      chartsLabels.push(estado);
    }

    // Iterar sobre el mapa y llenar los arrays data y chartsLabels
    for (const [estado, turnos] of turnosAgrupados) {
      data.push(turnos.length);
    }
  
  // data.push(turnos.length);
    switch (chart) {
      case 'chart-1':
        this.data1 = data;
        this.chartsLabels1 = chartsLabels;
        break;
    }
  }
}