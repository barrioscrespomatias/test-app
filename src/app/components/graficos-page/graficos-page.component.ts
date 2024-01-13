import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Turno } from 'src/app/interfaces/turno';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';

@Component({
  selector: 'app-graficos-page',
  templateUrl: './graficos-page.component.html',
  styleUrls: ['./graficos-page.component.css']
})
export class GraficosPageComponent {
 //#region Constructor
 constructor(
  private usuarioService: UsuarioService,
  private turnoService: TurnoService,
  private firebaseService: FirebaseAuthService,
  public router: Router,

) {}

//#endregion

//#region Propiedades

usuario: any;
mail: string = this.firebaseService.userName;
turnos:any;
turnosAgrupados:any;
turnosProfesional:any;
turnosProfesionalArray:any;

data1: number[] = [];
chartsLabels1: Array<any> = [];
title = 'Cantidad Turnos Por Especialidad';
type = 'bar';
chartSelector1 = '.chart-1';

data2: number[] = [1,2,3];
chartsLabels2: Array<any> = ["AA", "BB", "CC"];
title2 = 'Prueba';
type2 = 'line';
chartSelector2 = '.chart-2';
//#endregion



//#region Hooks

async ngOnInit() {
  this.usuarioService.getUsuario(this.mail).then((usuario: any) => {
    this.usuario = usuario;
  });

  this.turnoService.TraerTodos().then((turnos: any) => {
    this.turnos = turnos;
  });

  (await this.turnoService.TraerTodos()).subscribe(turnosDelProfesional => {
    this.turnosProfesional = this.AgruparTurnosPorEspecialidad(turnosDelProfesional);

    // Convertir el Map a un array para usar en la plantilla
    this.turnosProfesionalArray = Array.from(this.turnosProfesional.values());
    this.GenerarDatosParaGrafico(this.turnosProfesionalArray);
  });
}

//#endregion

//#region Metodos

//#region Cantidad Turnos Por Especialdiad
GenerarDatosParaGrafico(turnosAgrupados: Map<Turno, Turno[]>){
  const data: number[] = []
  const chartsLabels: string[] = [];

  // Iterar sobre el mapa y llenar los arrays data y chartsLabels
  for (const [turno, turnos] of turnosAgrupados) {
    chartsLabels.push(turno.especialidad);
  }

    // Iterar sobre el mapa y llenar los arrays data y chartsLabels
    for (const turnos of turnosAgrupados) {
      data.push(turnos.length);
    }

    this.data1 = data;
    this.chartsLabels1 = chartsLabels;
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

//#endregion


ReloadCurrentRoute() {
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/refreshPage', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}

// GetFormattedDate(fecha: any): string {
//   const date = fecha ? new Date(fecha.seconds * 1000) : null;

//   return this.datePipe.transform(date, 'dd/MM') ?? '';
// }

//#endregion
}