import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
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
              private firebaseService:FirebaseAuthService,
              private changeDetector: ChangeDetectorRef 
  ){

  }

  messageInput!: any;

  //#region Graficos
  turnosPorPaciente: Turno[] = [];
  datePropertyFalse = false;
  isLogged: boolean = false;
  turnosRealizados: Turno[] = [];



  // Turnos por paciente
  data1: number[] = [];
  chartsLabels1: Array<string> = [];
  title1 = 'Turnos por paciente';
  type1 = 'line';
  chartSelector1 = '.chart-1';

  // Cantidad de pacientes por especialidad
  data2: number[] = [];
  chartsLabels2: Array<string> = [];
  title2 = 'Cantidad de pacientes por especialidad';
  type2 = 'bar';
  chartSelector2 = '.chart-2';

  // Cantidad de pacientes por especialidad
  data3: number[] = [];
  chartsLabels3: Array<string> = [];
  title3 = 'Cantidad de medicos por especialidad';
  type3 = 'line';
  chartSelector3 = '.chart-3';

    // Cantidad de pacientes por especialidad
  data4: number[] = [];
  chartsLabels4: Array<string> = [];
  title4 = 'Cantidad de visitas';
  type4 = 'bar';
  chartSelector4 = '.chart-4';

  //#endregion

  groupArray(data: any[], size: number): any[][] {
    let newArray = [];
    for (let i = 0; i < data.length; i += size) {
      newArray.push(data.slice(i, i + size));
    }
    return newArray;
  }

  receiveMessage(paciente:any) {
    this.messageInput = paciente;

    this.turnoService.buscarTurnoPorPaciente(paciente).subscribe((t) => {
      this.turnosPorPaciente = t as Turno[];
      this.calcularTurnosPorPaciente();
    });
  }
  


  async ngOnInit(): Promise<void> {
    await this.checkLoggedIn();

    this.turnoService.traerTurnoPorEstado('Realizado').subscribe(async (t) => {
      this.turnosRealizados = t as Turno[];

      if(this.turnosRealizados){
        await this.calcularCantidadVisitas();
        await this.calcularCantidadPacientesPorEspecialidad()
        await this.calcularCantidadMedicosPorEspecialidad()
      }
    });
  }

  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }

  async calcularCantidadVisitas(){

    this.data4.push(this.turnosRealizados.length);
    this.chartsLabels4.push('Cantidad de visitas')

    this.changeDetector.detectChanges();
  };

  async calcularCantidadPacientesPorEspecialidad() {
    var turnosPorEspecialidad = this.AgruparTurnosPorEspecialidad(this.turnosRealizados);
    this.GenerarDatosPacientesPorEspecialidad(turnosPorEspecialidad,  'chart-2')
  }

  async calcularCantidadMedicosPorEspecialidad() {
    var turnosPorEspecialidad = this.AgruparTurnosPorEspecialidad(this.turnosRealizados);
    this.GenerarDatosMedicosPorEspecialidad(turnosPorEspecialidad,  'chart-3')
  }

  calcularTurnosPorPaciente() {
    var turnosPorEstado = this.AgruparTurnosPorEstado(this.turnosPorPaciente);
    this.GenerarDatosTurnosPacientePorEstado(turnosPorEstado,  'chart-1')
  }

  AgruparTurnosPorEspecialidad(turnos: Turno[]): Map<string, Turno[]> {
    const turnosAgrupados = new Map<string, Turno[]>();

    for (const turno of turnos) {
      // Utilizar la especialidad como clave
      const claveEspecialidad = turno.especialidad;

      // Si la clave aún no existe en el mapa, agregar un nuevo array y el turno
      if (claveEspecialidad !== undefined) {
        if (!turnosAgrupados.has(claveEspecialidad)) {
          turnosAgrupados.set(claveEspecialidad, [turno]);
        } else {
          // Si la clave ya existe, agregar el turno al array existente
          turnosAgrupados.get(claveEspecialidad)!.push(turno);
        }
      }
    }
    return turnosAgrupados;
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

  GenerarDatosPacientesPorEspecialidad(turnosAgrupados: Map<string, Turno[]>, chart: string) {
    const data: number[] = [];
    const chartsLabels: string[] = [];

    // Iterar sobre el mapa y llenar los chartslabels
    for (const [especialidad, turnos] of turnosAgrupados) {
      chartsLabels.push(especialidad);
    }

    const pacientesUnicos = new Set<string>();
    // Iterar sobre el mapa y llenar los data
    for (const [especialidad, turnos] of turnosAgrupados) {
      for (let turno of turnos){
        if(turno.paciente)
          pacientesUnicos.add(turno.paciente);
      }
      data.push(pacientesUnicos.size);
    }
  
  // data.push(turnos.length);
    switch (chart) {
      case 'chart-2':
        this.data2 = data;
        this.chartsLabels2 = chartsLabels;
        break;
    }
  }

  GenerarDatosMedicosPorEspecialidad(turnosAgrupados: Map<string, Turno[]>, chart: string) {
    const data: number[] = [];
    const chartsLabels: string[] = [];

    // Iterar sobre el mapa y llenar los chartslabels
    for (const [especialidad, turnos] of turnosAgrupados) {
      chartsLabels.push(especialidad);
    }

    const profesionalesUnicos = new Set<string>();
    // Iterar sobre el mapa y llenar los data
    for (const [especialidad, turnos] of turnosAgrupados) {
      for (let turno of turnos){
        if(turno.profesional)
          profesionalesUnicos.add(turno.profesional);
      }
      data.push(profesionalesUnicos.size);
    }
  
  // data.push(turnos.length);
    switch (chart) {
      case 'chart-3':
        this.data3 = data;
        this.chartsLabels3 = chartsLabels;
        break;
    }
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