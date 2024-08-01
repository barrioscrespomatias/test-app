import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FirebaseAuthService } from '../../../services/angularFire/angular-fire.service';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UsuarioV2Service } from 'src/app/servicios/v2/usuario-v2.service';
import { Router } from '@angular/router';

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
  @Input() languageEnabled:boolean;

  constructor(public firebaseService: FirebaseAuthService,
              private translate: TranslateService,
              private userSerivce: UsuarioV2Service,
              private router: Router, 
  ) {
    this.onlyLanguage = false;
    this.languageEnabled = false;
    this.checkLoggedIn();

    let language = localStorage.getItem('language');

    if(language)
      this.translate.setDefaultLang(language);
    else
      this.translate.setDefaultLang('es');
  }
  public isLogged: boolean = false;
  public userName: string = this.firebaseService.userName;

  idioma:string = 'espanol';
  idioma_src:string = '../../../../assets/img/idioma/'+ 'espanol' +'.png';

  currentUser:any;
  mail: string = this.firebaseService.userName;
  imagenPerfil:string = 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp';

  async checkLoggedIn() {    
    this.isLogged = await this.firebaseService.isLoggedIn();
  }

  async ngOnInit(): Promise<void> {
    this.currentUser = await this.userSerivce.getUsuario(this.mail);
    if(this.currentUser){
        let idioma = localStorage.getItem('language');
        this.imagenPerfil = this.currentUser.imagenPerfil1;
        console.log(this.imagenPerfil)
        if(idioma)
          this.translate.setDefaultLang(idioma);
    
        switch(idioma)
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
  }

  SignOut() {
    localStorage.removeItem('language');
    this.translate.setDefaultLang('es');
    this.firebaseService.SignOut();
  }

  cambiarIdioma(idiomaRecibido:string) {
    
    this.sendMessage(idiomaRecibido);
    this.idioma = idiomaRecibido;

    this.translate.setDefaultLang(idiomaRecibido);
    localStorage.setItem('language',idiomaRecibido);
    
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

  navigate(path:string) {
    console.log(path)
    this.router.navigate([path]);
  }

  sendMessage(mensaje:string) {
    this.messageEvent.emit(mensaje);
  }
}
