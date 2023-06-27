import { Component } from '@angular/core';
import { FirebaseAuthService } from '../../../services/angularFire/angular-fire.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(public firebaseService: FirebaseAuthService) {
    this.checkLoggedIn();
  }
  public isLogged: boolean = false;
  public userName: string = this.firebaseService.userName;
  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }

  SignOut() {
    this.firebaseService.SignOut();
  }
}
