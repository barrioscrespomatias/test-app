import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Turno } from 'src/app/interfaces/turno';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';

@Component({
  selector: 'app-graficos-page',
  templateUrl: './graficos-page.component.html',
  styleUrls: ['./graficos-page.component.css'],
})
export class GraficosPageComponent {
  //#region Constructor
  constructor(
    private usuarioService: UsuarioService,
    private turnoService: TurnoService,
    private firebaseService: FirebaseAuthService,
    public router: Router
  ) {}

  //#endregion

  //#region Propiedades

  usuario: any;
  mail: string = this.firebaseService.userName;
  turnos: any;
  turnosAgrupados: any;
  turnosProfesional: any;
  turnosProfesionalArray: any;
  today = new Date();
  lastWeek = new Date();

  datePropertyTrue: boolean = true;
  datePropertyFalse: boolean = false;

  // Cantidad de turnos por especialidad
  data1: number[] = [];
  chartsLabels1: Array<any> = [];
  title = 'Cantidad Turnos Por Especialidad';
  type = 'bar';
  chartSelector1 = '.chart-1';
  
  // Cantidad de turnos solicitado por médico en un lapso de tiempo
  data2: number[] = [];
  chartsLabels2: Array<any> = [];
  title2 = 'Turnos solicitados por Médico en un lapso de tiempo';
  type2 = 'bar';
  chartSelector2 = '.chart-2';

  // Cantidad de turnos finalizado por médico en un lapso de tiempo
  data3: number[] = [];
  chartsLabels3: Array<any> = [];
  title3 = 'Turnos finalizados por Médico en un lapso de tiempo';
  type3 = 'bar';
  chartSelector3 = '.chart-3';
  //#endregion

  //#region Hooks

  async ngOnInit() {
    this.usuarioService.getUsuario(this.mail).then((usuario: any) => {
      this.usuario = usuario;
    });

    //#region chart-1
    
    (await this.turnoService.TraerTodos()).subscribe((turnosDelProfesional) => {
      this.turnosProfesional =
        this.AgruparTurnosPorEspecialidad(turnosDelProfesional);

      // Convertir el Map a un array para usar en la plantilla
      this.turnosProfesionalArray = Array.from(this.turnosProfesional.values());
      this.GenerarDatosPorEspecialidad(this.turnosProfesionalArray, 'chart-1');
    });
    //#endregion
    this.today.setHours(0, 0, 0, 0);
    this.lastWeek.setDate(this.today.getDate() - 4);
    this.lastWeek.setHours(0, 0, 0, 0);

    this.Refresh2(this.lastWeek, this.today);
  }
  //#endregion

  //#region Metodos

  //#region Generar Datos
  GenerarDatosTurnosPorProfesional(
    turnosAgrupados: Map<Turno, Turno[]>,
    chart: string
  ) {
    const data: number[] = [];
    const chartsLabels: string[] = [];

    // Iterar sobre el mapa y llenar los arrays data y chartsLabels
    for (const [turno, turnos] of turnosAgrupados) {
      if (turno.profesional !== undefined) {
        chartsLabels.push(turno.profesional);
      }
    }

    // Iterar sobre el mapa y llenar los arrays data y chartsLabels
    for (const turnos of turnosAgrupados) {
      data.push(turnos.length);
    }

    switch (chart) {
      case 'chart-2':
        this.data2 = data;
        this.chartsLabels2 = chartsLabels;
        break;
      case 'chart-3':
        this.data3 = data;
        this.chartsLabels3 = chartsLabels;
        break;
    }
  }

  GenerarDatosPorEspecialidad(turnosAgrupados: Map<Turno, Turno[]>, chart: string) {
    const data: number[] = [];
    const chartsLabels: string[] = [];

    // Iterar sobre el mapa y llenar los arrays data y chartsLabels
    for (const [turno, turnos] of turnosAgrupados) {
      chartsLabels.push(turno.especialidad);
    }

    // Iterar sobre el mapa y llenar los arrays data y chartsLabels
    for (const turnos of turnosAgrupados) {
      data.push(turnos.length);
    }

    switch (chart) {
      case 'chart-1':
        this.data1 = data;
        this.chartsLabels1 = chartsLabels;
        break;
    }
  }

  //#endregion

  //#region Agrupar Turnos
  
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

  AgruparTurnosPorProfesional(turnos: Turno[]): Map<string, Turno[]> {
    const turnosAgrupados = new Map<string, Turno[]>();

    for (const turno of turnos) {
      // Utilizar la especialidad como clave
      const claveProfesional = turno.profesional;

      // Si la clave aún no existe en el mapa, agregar un nuevo array y el turno
      if (claveProfesional !== undefined) {
        if (!turnosAgrupados.has(claveProfesional)) {
          turnosAgrupados.set(claveProfesional, [turno]);
        } else {
          // Si la clave ya existe, agregar el turno al array existente
          turnosAgrupados.get(claveProfesional)!.push(turno);
        }
      }
    }
    return turnosAgrupados;
  }

  //#endregion

  //#region Actualizar Grafico
  async ActualizarGrafico2(event: { desde: any; hasta: any }) {
    (
      await this.turnoService.TurnosSolicitadosRangoFechas(
        event.desde,
        event.hasta
      )
    ).subscribe((turnosRangoFecha) => {
      this.turnosProfesional =
        this.AgruparTurnosPorProfesional(turnosRangoFecha);
        console.log(turnosRangoFecha)

      // Convertir el Map a un array para usar en la plantilla
      this.turnosProfesionalArray = Array.from(this.turnosProfesional.values());
      this.GenerarDatosTurnosPorProfesional(
        this.turnosProfesionalArray,
        'chart-2'
      );
    });
  }

  async Refresh2(desde: Date, hasta: Date) {
    (
      await this.turnoService.TurnosSolicitadosRangoFechas(desde, hasta)
    ).subscribe((turnosRangoFecha) => {
      this.turnosProfesional =
        this.AgruparTurnosPorProfesional(turnosRangoFecha);

      // Convertir el Map a un array para usar en la plantilla
      this.turnosProfesionalArray = Array.from(this.turnosProfesional.values());
      this.GenerarDatosTurnosPorProfesional(
        this.turnosProfesionalArray,
        'chart-2'
      );
    });
  }

  async ActualizarGrafico3(event: { desde: any; hasta: any }) {
    (
      await this.turnoService.TurnosFinalizadosRangoFechas(
        event.desde,
        event.hasta
      )
    ).subscribe((turnosRangoFecha) => {
      this.turnosProfesional =
        this.AgruparTurnosPorProfesional(turnosRangoFecha);
        console.log(turnosRangoFecha)

      // Convertir el Map a un array para usar en la plantilla
      this.turnosProfesionalArray = Array.from(this.turnosProfesional.values());
      this.GenerarDatosTurnosPorProfesional(
        this.turnosProfesionalArray,
        'chart-3'
      );
    });
  }

  async Refresh3(desde: Date, hasta: Date) {
    (
      await this.turnoService.TurnosSolicitadosRangoFechas(desde, hasta)
    ).subscribe((turnosRangoFecha) => {
      this.turnosProfesional =
        this.AgruparTurnosPorProfesional(turnosRangoFecha);

      // Convertir el Map a un array para usar en la plantilla
      this.turnosProfesionalArray = Array.from(this.turnosProfesional.values());
      this.GenerarDatosTurnosPorProfesional(
        this.turnosProfesionalArray,
        'chart-2'
      );
    });
  }

  //#endregion

  ReloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router
      .navigateByUrl('/refreshPage', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([currentUrl]);
      });
  }
}