import { Component, Input } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { EspecialidadService } from 'src/app/servicios/entidades/especialidad/especialidad.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css'],
})
export class TablaTurnosComponent {
  //#region Constructor
  constructor(
    private especialidadService: EspecialidadService,
    private usuarioService: UsuarioService,
    private turnoService: TurnoService,
    private firebaseService: FirebaseAuthService
  ) {}

  //#endregion

  //#region Propiedades
  usuario: any;
  mail: string = this.firebaseService.userName;
  turnos: any;
  especialidades: any;
  formularioSeleccionado:string = '';
  turno:any;

  //#endregion

  //#region Hooks

  async ngOnInit() {
    this.usuarioService.getProfesional(this.mail).then((usuario: any) => {
      this.usuario = usuario;
    });

    this.turnoService.TraerTodos().then((turnos: any) => {
      this.turnos = turnos;
    });

    this.especialidadService.TraerTodos().then((especialidades: any) => {
      this.especialidades = especialidades;
    });
  }

  //#endregion

  //#region Metodos
  ConvertirFecha(fecha:any){
    return new Date(fecha.seconds * 1000);
  }

  AbrirModal(formularioModal:string, turno:Turno) {
    this.formularioSeleccionado = formularioModal;
    this.turno = turno;
  }

  //#endregion
}
