import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FirebaseAuthService } from '../../../services/angularFire/angular-fire.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
