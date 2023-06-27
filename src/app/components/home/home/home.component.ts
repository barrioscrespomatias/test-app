import { Component } from '@angular/core';
import { FirebaseAuthService } from '../../../services/angularFire/angular-fire.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
