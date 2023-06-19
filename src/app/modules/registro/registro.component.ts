import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { ImagenService } from 'src/app/services/imagen/imagen.service';
import { PacienteService } from 'src/app/services/paciente/paciente.service';
import { ProfesionalService } from 'src/app/services/profesional/profesional.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  form!: FormGroup;
  @Input() valueFromDirective: any;
  @Input() emailRegistrado:any;
  attributeValue: string = '';
  emailRecibido: string = '';

  constructor(
    private firebaseService: FirebaseAuthService
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      // usuario : new FormControl('',)
      email: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      password: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    });
  }

  public isLogged: boolean = this.firebaseService.isLoggedIn;

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  SignUp() {
    this.firebaseService.SignUp(this.email?.value, this.password?.value);
  }

  recibirItemDesdeHijo(valorAtributo: string): void {
    this.attributeValue = valorAtributo;
  }

  recibirItemDeHijo(email : string){
    this.emailRecibido = email;
  }
}
