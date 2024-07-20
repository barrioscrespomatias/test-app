import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FirebaseAuthService } from '../../../services/angularFire/angular-fire.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from '../../nav/nav/nav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, 
            FormsModule, 
            ReactiveFormsModule, 
          ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeComponent {
  
  constructor(public firebaseService: FirebaseAuthService) {
    this.checkLoggedIn();
  }
  public isLogged: boolean = false;
  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }
  SignOut() {
    this.firebaseService.SignOut();
  }
}
