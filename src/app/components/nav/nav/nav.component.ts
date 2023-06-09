import { Component } from '@angular/core';
import { FirebaseAuthService } from '../../../services/angularFire/angular-fire.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(public firebaseService: FirebaseAuthService) {}

  public isLogged: boolean = this.firebaseService.isLoggedIn;
  public userName: string = this.firebaseService.userName;

  SignOut() {
    this.firebaseService.SignOut();
  }
}
