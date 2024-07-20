import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../../services/angularFire/angular-fire.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit{
  constructor(public firebaseService: FirebaseAuthService) {
    this.checkLoggedIn();
  }
  public isLogged: boolean = false;
  public userName: string = this.firebaseService.userName;

  idioma:string = 'espanol';
  idioma_src:string = '../../../../assets/img/idioma/'+ this.idioma +'.png';

  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }

  ngOnInit(): void {
    console.log(this.isLogged)
  }

  SignOut() {
    this.firebaseService.SignOut();
  }

  cambiarIdioma(idioma:string) {
    
    this.idioma = idioma;
    this.idioma_src = '../../../../assets/img/idioma/'+ this.idioma +'.png';
  }
}
