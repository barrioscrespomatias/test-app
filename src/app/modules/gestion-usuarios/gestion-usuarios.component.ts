import { Component } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'],
})
export class GestionUsuariosComponent {
  //#region Propiedades
  componenteVisible: string = 'tabla-turnos';
  usuario: any;
  mail: string = this.firebaseService.userName;

  //#endregion

  //#region Constructor

  constructor(
    private usuarioService: UsuarioService,
    private firebaseService: FirebaseAuthService
  ) {}

  //#endregion
  //#region Hooks
  async ngOnInit() {

    this.usuarioService.getProfesional(this.mail).then((usuario: any) => {
      this.usuario = usuario;
    });

  }
  //#endregion
}
