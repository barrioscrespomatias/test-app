import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../services/angularFire/angular-fire.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavComponent } from 'src/app/components/nav/nav/nav.component';
import { RouterLink, RouterModule } from '@angular/router';

//TODO Revisar login. Es raro que loguee cuando no esta llamando al servicio adecuado.
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule,            
            FormsModule,
            ReactiveFormsModule,
            NavComponent,
            TranslateModule,
            RouterLink
            ],
  providers:[],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent {
  form!: FormGroup;
  isLogged: boolean = false;
  onlyLanguage: boolean = true;

  constructor(
    public firebaseService: FirebaseAuthService,
    private translate: TranslateService,
    // public firestoreService: FirestoreService
  ) {
    this.checkLoggedIn();
    console.log("constructor ok")
  }

  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }

  SignOut() {
    this.firebaseService.SignOut();
  }


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
    this.firebaseService.SignIn(this.email?.value, this.password?.value);
  }

  GoogleAuth() {
    this.firebaseService.GoogleAuth();
  }

  AccesoRapido(mail: string, password: string) {
    this.email?.setValue(mail);
    this.password?.setValue(password);
  }

  receiveMessage(idioma: any) {
    this.translate.setDefaultLang(idioma);
  }
}
