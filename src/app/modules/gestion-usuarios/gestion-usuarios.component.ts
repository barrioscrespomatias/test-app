import { Component } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'],
})
export class GestionUsuariosComponent {
  //#region Propiedades
  usuario: any;
  mail: string = this.firebaseService.userName;
  componenteVisible: string = 'tabla-turnos';

  //#endregion

  //#region Constructor

  constructor(
    private usuarioService: UsuarioService,
    private firebaseService: FirebaseAuthService
  ) {}

  //#endregion
  //#region Hooks
  async ngOnInit() {

    this.usuarioService.getUsuario(this.mail).then((usuario: any) => {
      this.usuario = usuario;
      if(this.usuario?.perfil != 'profesional')
      this.componenteVisible = 'solicitar-turno'
    });

  }
  //#endregion

  SignOut() {
    this.firebaseService.SignOut();
  }
}
