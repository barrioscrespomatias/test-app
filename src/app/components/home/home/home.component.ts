import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FirebaseAuthService } from '../../../services/angularFire/angular-fire.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from '../../nav/nav/nav.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, 
            FormsModule, 
            ReactiveFormsModule, 
            TranslateModule,
            NavComponent
          ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeComponent {
  
  constructor(public firebaseService: FirebaseAuthService, 
              private translate: TranslateService) {
    this.checkLoggedIn();
    this.translate.setDefaultLang('es');
  }
  public isLogged: boolean = false;
  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }
  SignOut() {
    this.firebaseService.SignOut();
  }

  receiveMessage(idioma: string) {
    this.translate.setDefaultLang(idioma);
  }
}
