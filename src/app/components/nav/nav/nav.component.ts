import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FirebaseAuthService } from '../../../services/angularFire/angular-fire.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone: true,
  imports:[CommonModule, TranslateModule],
  providers: [FirebaseAuthService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavComponent implements OnInit{

  @Output() messageEvent = new EventEmitter<string>();
  @Input() onlyLanguage:boolean;

  constructor(public firebaseService: FirebaseAuthService,
              private translate: TranslateService
  ) {
    this.onlyLanguage = false;
    this.checkLoggedIn();
    this.translate.setDefaultLang('es');
  }
  public isLogged: boolean = false;
  public userName: string = this.firebaseService.userName;

  idioma:string = 'espanol';
  idioma_src:string = '../../../../assets/img/idioma/'+ 'espanol' +'.png';

  async checkLoggedIn() {    
    this.isLogged = await this.firebaseService.isLoggedIn();
  }

  ngOnInit(): void {
    console.log('solo lenguaje')
    console.log(this.onlyLanguage)
  }

  SignOut() {
    this.firebaseService.SignOut();
  }

  cambiarIdioma(idiomaRecibido:string) {
    
    this.sendMessage(idiomaRecibido);
    this.idioma = idiomaRecibido;

    console.log(idiomaRecibido)
    this.translate.setDefaultLang(idiomaRecibido);
    
    switch(idiomaRecibido)
    {
      case 'es':
        this.idioma = 'espanol';
        break;
      case 'en':
        this.idioma = 'ingles';
        break;
      case 'pt':
        this.idioma = 'portugues';
        break
      default:
        this.idioma = 'espanol'
        break;
    }

    this.idioma_src = '../../../../assets/img/idioma/'+ this.idioma +'.png';
  }

  sendMessage(mensaje:string) {
    this.messageEvent.emit(mensaje);
  }
}
