import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent {

  constructor(
    private firebaseService: FirebaseAuthService,
    private usuarioService: UsuarioService,
  ) {}

  usuario!: any;
  email: string = this.firebaseService.userName;
  form!: FormGroup;

  //#region Hooks
  async ngOnInit() {

    await this.usuarioService.getProfesional(this.email).then((usuario: any) => {
      this.usuario = usuario;        
    });

    if(this.usuario)
    {
      this.form = new FormGroup({  
        nombre: new FormControl(this.usuario?.nombre),
        apellido: new FormControl(this.usuario?.apellido),         
        mail: new FormControl(this.usuario?.mail),
        dni: new FormControl(this.usuario?.dni),
        edad: new FormControl(this.usuario?.edad),      
        obra_social: new FormControl(this.usuario?.obraSocial),      
         
      });
    }
  }   


  //#endregion

  //#region Getters
  get nombre() {
    return this.form.get('nombre');
  }

  get apellido() {
    return this.form.get('apellido');
  }

  get mail() {
    return this.form.get('mail');
  }

  get dni() {
    return this.form.get('dni');
  }

  get edad() {
    return this.form.get('edad');
  }

  get obra_social() {
    return this.form.get('obra_social');
  }

  //#endregion

}
