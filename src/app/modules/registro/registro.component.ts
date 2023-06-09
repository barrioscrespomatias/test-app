import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  form!: FormGroup;

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
    this.firebaseService.SignUp(this.email?.value, this.password?.value);
  }
}
