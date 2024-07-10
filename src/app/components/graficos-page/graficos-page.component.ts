import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Turno } from 'src/app/interfaces/turno';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import * as moment from 'moment';
import 'moment/locale/es';
import { FechaService } from 'src/app/helper/fecha/fecha.service';
import { LoginService } from 'src/app/servicios/entidades/login/login.service';
import { Login } from 'src/app/interfaces/login';
import { TurnoV2Service } from 'src/app/servicios/v2/turno-v2.service';

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
    public router: Router,
    private fechaService: FechaService,
    private loginService: LoginService,
    private turnoV2Service:TurnoV2Service
  ) {}

  userSelectedData: string = '';

  async onUserSelected(data: string) {
    this.userSelectedData = data;
    (await this.loginService.LoginsPorUsuario(data)).subscribe((logs) => {
      this.logins = logs;
    });
  }

  //#endregion

  //#region Propiedades

  usuario: any;
  mail: string = this.firebaseService.userName;
  turnos: any;
  turnosAgrupados: any;
  turnosProfesional: any;
  turnosPorDia: any;
  turnosProfesionalArray: any;
  loginsArray: any;
  turnosPorDiaArray: any;
  today = new Date();
  lastWeek = new Date();

  logins: any;
  loginsTable: any;

  datePropertyTrue: boolean = true;
  datePropertyFalse: boolean = false;

  turnosV2: Turno[] = [];

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

  // Cantidad de turnos por dia
  data4: number[] = [];
  chartsLabels4: Array<any> = [];
  title4 = 'Turnos por dia';
  type4 = 'bar';
  chartSelector4 = '.chart-4';

  // Cantidad de turnos por dia
  data5: number[] = [];
  chartsLabels5: Array<any> = [];
  title5 = 'Log de ingresos al sistema';
  type5 = 'bar';
  chartSelector5 = '.chart-5';

    // Cantidad de visitas que tuvo la clinica
  data6: number[] = [];
  chartsLabels6: Array<string> = [];
  title6 = 'Cantidad de visitas que tuvo la clinica';
  type6 = 'pie';
  chartSelector6 = '.chart-6';
  //#endregion

  //#region Hooks

  async ngOnInit() {
    this.usuarioService.getUsuario(this.mail).then((usuario: any) => {
      this.usuario = usuario;
    });

    this.turnoV2Service.traerTurnoPorEstado('Realizado').subscribe((t) => {
      this.turnosV2 = t as Turno[];
      console.log(this.turnosV2)
      this.inicializarCharts();
    });

    // console.log(this.userSelected);

    //#region chart-1
    
    (await this.turnoService.TurnosIniciados()).subscribe((turnosDelProfesional) => {
      this.turnosProfesional =
        this.AgruparTurnosPorEspecialidad(turnosDelProfesional);

      // Convertir el Map a un array para usar en la plantilla
      this.turnosProfesionalArray = Array.from(this.turnosProfesional.values());
      this.GenerarDatosPorEspecialidad(this.turnosProfesionalArray, 'chart-1');
    });

    (await this.turnoService.TurnosPorDia()).subscribe((turnos) => {
      this.turnosPorDia =
        this.AgruparTurnosPorDia(turnos);

      // Convertir el Map a un array para usar en la plantilla
      this.turnosPorDiaArray = Array.from(this.turnosPorDia.values());
      this.GenerarDatosPorDia(this.turnosPorDiaArray, 'chart-4');
    });
    //#endregion


    this.Refresh2(this.fechaService.InicioMesActual(),this.fechaService.FinMesActual());
    this.Refresh3(this.fechaService.InicioMesActual(),this.fechaService.FinMesActual());

        
    (await this.loginService.getAll()).subscribe((logs) => {
      this.logins =
        this.AgruparLoginsPorUsuario(logs);

      // Convertir el Map a un array para usar en la plantilla
      this.loginsArray = Array.from(this.logins.values());
      this.GenerarDatosLoginsPorUsuario(this.loginsArray, 'chart-5');
    });
  }
  //#endregion

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      // this.updateChart();
      console.log(changes['data'])
    }
  }

  //#region Metodos

  inicializarCharts() {
    this.calcularCantidadVisitas();
  }

  calcularCantidadVisitas(){
    // data6: number[] = [];
    // chartsLabels6: Array<any> = [];
    this.data6.push(this.turnosV2.length);
    this.chartsLabels6.push('Cantidad de visitas')
  };


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

  GenerarDatosPorDia(turnosAgrupados: Map<Turno, Turno[]>, chart: string) {
    const data: number[] = [];
    const chartsLabels: string[] = [];
    // Iterar sobre el mapa y llenar los arrays data y chartsLabels
    for (const [turno, turnos] of turnosAgrupados) {
      if(turno.fecha != undefined){
        var dia = this.fechaService.DiaDeLaFecha(turno.fecha); 
        chartsLabels.push(dia);
      }
    }

    // Iterar sobre el mapa y llenar los arrays data y chartsLabels
    for (const turnos of turnosAgrupados) {
      data.push(turnos.length);
    }

    switch (chart) {
      case 'chart-4':
        this.data4 = data;
        this.chartsLabels4 = chartsLabels;
        break;
    }
  }

  GenerarDatosLoginsPorUsuario(loginsAgrupados: Map<Login, Login[]>, chart: string) {
    const data: number[] = [];
    const chartsLabels: string[] = [];
    // Iterar sobre el mapa y llenar los arrays data y chartsLabels
    for (const [login, logins] of loginsAgrupados) {
      if(login.email != undefined){
        var user = login.email;
        chartsLabels.push(user);
      }
    }

    // Iterar sobre el mapa y llenar los arrays data y chartsLabels
    for (const logins of loginsAgrupados) {
      data.push(logins.length);
    }

    switch (chart) {
      case 'chart-5':
        this.data5 = data;
        this.chartsLabels5 = chartsLabels;
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

  AgruparTurnosPorDia(turnos: Turno[]): Map<string, Turno[]> {
    const turnosAgrupados = new Map<string, Turno[]>();

    for (const turno of turnos) {
      // const fecha = moment(turno.fecha);
      // const claveDia = fecha.format('dddd'); // Obtener el nombre del día de la semana

      if(turno.fecha){
        var claveDia = this.fechaService.DiaDeLaFecha(turno.fecha);  
  
        if (claveDia !== undefined) {
          if (!turnosAgrupados.has(claveDia)) {
            turnosAgrupados.set(claveDia, [turno]);
          } else {
            turnosAgrupados.get(claveDia)!.push(turno);
          }
        }        
      }
    }
    return turnosAgrupados;
  }

  AgruparLoginsPorUsuario(logins: Login[]): Map<string, Login[]> {
    const turnosAgrupados = new Map<string, Login[]>();

    for (const login of logins) {
      if(login.email){
        var clave = login.email;
  
        if (clave !== undefined) {
          if (!turnosAgrupados.has(clave)) {
            turnosAgrupados.set(clave, [login]);
          } else {
            turnosAgrupados.get(clave)!.push(login);
          }
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
      await this.turnoService.TurnosFinalizadosRangoFechas(desde, hasta)
    ).subscribe((turnosRangoFecha) => {
      this.turnosProfesional =
        this.AgruparTurnosPorProfesional(turnosRangoFecha);

      // Convertir el Map a un array para usar en la plantilla
      this.turnosProfesionalArray = Array.from(this.turnosProfesional.values());
      this.GenerarDatosTurnosPorProfesional(
        this.turnosProfesionalArray,
        'chart-3'
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

  FechaFirestore(date:any){
    return this.fechaService.FechaFirestore(date);
  }
}