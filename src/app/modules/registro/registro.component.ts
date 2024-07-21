import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormularioRegistroComponent } from 'src/app/components/formulario/formulario-registro/formulario-registro.component';
import { ImageComponentComponent } from 'src/app/components/imageComponent/image-component/image-component.component';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { UsuarioV2Service } from 'src/app/servicios/v2/usuario-v2.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: true,
  imports: [CommonModule, 
            FormsModule, 
            ReactiveFormsModule, 
            ImageComponentComponent,
            FormularioRegistroComponent],
  providers: [UsuarioService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegistroComponent {
  //#region Propiedades
  public isLogged: boolean = false;

  form!: FormGroup;
  @Input() valueFromDirective: any;
  @Input() emailRegistrado:any;
  attributeValue: string = '';
  emailRecibido: string = '';
  currentUser: any;
  mail: string = this.firebaseService.userName;
  
  //#endregion

  //#region Constructor
  constructor(
    private firebaseService: FirebaseAuthService,
    private usuarioService: UsuarioV2Service,
  ) { this.checkLoggedIn();}

  //#endregion

  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }

  SignOut() {
    this.firebaseService.SignOut();
  }
  
  //#region Hooks
  async ngOnInit(): Promise<void> {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      password: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    });

    this.currentUser = await this.usuarioService.buscarUsuarioPorMail(this.mail);
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

  recibirItemDesdeHijo(valorAtributo: any): void {
    this.attributeValue = valorAtributo;
  }

  recibirItemDeHijo(email : any){
    this.emailRecibido = email;
  }
  //#endregion
}
