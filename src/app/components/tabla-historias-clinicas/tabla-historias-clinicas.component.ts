import { Component } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno';
import { Usuario } from 'src/app/interfaces/usuario';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { EspecialidadService } from 'src/app/servicios/entidades/especialidad/especialidad.service';
import { TurnoService } from 'src/app/servicios/entidades/turno/turno.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';

@Component({
  selector: 'app-tabla-historias-clinicas',
  templateUrl: './tabla-historias-clinicas.component.html',
  styleUrls: ['./tabla-historias-clinicas.component.css']
})
export class TablaHistoriasClinicasComponent {
  heroes = [
    { id: 11, name: 'Mr. Nice', country: 'India' },
    { id: 12, name: 'Narco' , country: 'USA'},
    { id: 13, name: 'Bombasto' , country: 'UK'},
    { id: 14, name: 'Celeritas' , country: 'Canada' },
    { id: 15, name: 'Magneta' , country: 'Russia'},
    { id: 16, name: 'RubberMan' , country: 'China'},
    { id: 17, name: 'Dynama' , country: 'Germany'},
    { id: 18, name: 'Dr IQ' , country: 'Hong Kong'},
    { id: 19, name: 'Magma' , country: 'South Africa'},
    { id: 20, name: 'Tornado' , country: 'Sri Lanka'}
  ];

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
  usuarios: any;
  mail: string = this.firebaseService.userName;
  turnos: any;
  parametrosDinamicos: any;
  especialidades: any;
  formularioSeleccionado:string = '';
  turno:any;
  searchText: any;
  pacienteSeleccionado:string='';
  profesionalSeleccionado:string='';

  //#endregion

  //#region Hooks

  async ngOnInit() {
    this.usuarioService.getProfesional(this.mail).then((usuario: any) => {
      this.usuario = usuario;
    });

    this.usuarioService.TraerTodos().then((usuarios: any) => {
      this.usuarios = usuarios;
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

  ObtenerPacienteSeleccionado(emailPaciente:string){
    this.pacienteSeleccionado = emailPaciente;    
  }

  ObtenerProfesionalSeleccionado(emailProfesional:string){
    this.profesionalSeleccionado = emailProfesional;    
  }

  //#endregion
}
