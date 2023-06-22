import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../services/angularFire/angular-fire.service';
// import { FirestoreService } from '../../services/firestore/firestore.service';

//TODO Revisar login. Es raro que loguee cuando no esta llamando al servicio adecuado.


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form!: FormGroup;

  constructor(
    public firebaseService: FirebaseAuthService,
    // public firestoreService: FirestoreService
  ) {}

  public isLogged: boolean = this.firebaseService.isLoggedIn;

  ngOnInit(): void {
    this.form = new FormGroup({
      // usuario : new FormControl('',)
      email: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      password: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  SignIn() {
    console.log(this.email?.value, this.password?.value)
    this.firebaseService.SignIn(this.email?.value, this.password?.value);
    //TODO especificamente aca utiliza el serivicio
    // this.firestoreService.guardar(this.email?.value);
  }

  GoogleAuth() {
    this.firebaseService.GoogleAuth();
  }

  AccesoRapido(mail: string, password: string) {
    this.email?.setValue(mail);
    this.password?.setValue(password);
  }
}
