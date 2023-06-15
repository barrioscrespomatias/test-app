import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';

@Component({
  selector: 'app-pre-registro',
  templateUrl: './pre-registro.component.html',
  styleUrls: ['./pre-registro.component.css']
})
export class PreRegistroComponent {
  form!: FormGroup;
  // nuevoEmailRegistrado: string ='';
  @Output() onEnviarItemHaciaPadre = new EventEmitter<string>();

  
  constructor(public firebaseService: FirebaseAuthService) {}
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
    // this.nuevoEmailRegistrado = this.email?.value;
    this.firebaseService.SignUp(this.email?.value, this.password?.value);
  }

  enviarItemHaciaPadre(emailRegister: string){
    debugger
    this.onEnviarItemHaciaPadre.emit(emailRegister)
  }  

}
