import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { ImagenService } from 'src/app/services/imagen/imagen.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { ProfesionalService } from 'src/app/services/profesional/profesional.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  //#region Propiedades
  form!: FormGroup;
  @Input() valueFromDirective: any;
  @Input() emailRegistrado:any;
  attributeValue: string = '';
  emailRecibido: string = '';
  usuario: any;
  mail: string = this.firebaseService.userName;
  isLogged: boolean = this.firebaseService.isLoggedIn;
  //#endregion

  //#region Constructor
  constructor(
    private firebaseService: FirebaseAuthService,
    private usuarioService: UsuarioService,
  ) {}

  //#endregion
  
  //#region Hooks
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      password: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    });

    this.usuarioService.getProfesional(this.mail).then((usuario: any) => {
      this.usuario = usuario;
    });
  }
  //#endregion

  //#region Getters
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  //#endregion

  //#region Métodos
  SignUp() {
    this.firebaseService.SignUp(this.email?.value, this.password?.value);
  }

  recibirItemDesdeHijo(valorAtributo: string): void {
    this.attributeValue = valorAtributo;
  }

  recibirItemDeHijo(email : string){
    this.emailRecibido = email;
  }
  //#endregion
}
