import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioV2Service } from 'src/app/servicios/v2/usuario-v2.service';
import { ProfesionalComponent } from '../../entidades/profesional/profesional.component';
import { NavComponent } from 'src/app/components/nav/nav/nav.component';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';

@Component({
  selector: 'app-grilla-profesionales',
  standalone: true,
  imports: [RouterLink,
    CommonModule,
    ProfesionalComponent,
    NavComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './grilla-profesionales.component.html',
  styleUrl: './grilla-profesionales.component.css'
})
export class GrillaProfesionalesComponent {
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private usuarioService: UsuarioV2Service,
    private translate: TranslateService,
    private router: Router,
    private firebaseService:FirebaseAuthService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.profesion = navigation?.extras?.state?.['profesion'];
    this.pacienteSeleccionado = navigation?.extras?.state?.['pacienteSeleccionado'];
  }

  medium: string = 'round-image-medium';
  small: string = 'round-image-small';
  large: string = 'round-image-large';

  profesionales: Usuario[] = [];
  isLogged: boolean = false;
  languageEnabled: boolean = false;
  profesion: string;
  pacienteSeleccionado: string = '';

  sendMessage(mensaje: string) {
    this.messageEvent.emit(mensaje);
  }

  ngOnInit(): void {
    this.checkLoggedIn();
    if (this.profesion) {
      this.usuarioService.traerUsuariosPorProfesion(this.profesion).subscribe((t) => {
        this.profesionales = t as Usuario[];
      });
    }
  }

  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }

  receiveMessage(idioma: string) {
    this.translate.setDefaultLang(idioma);
  }

  navigateToGrillaFechas(profesional: string) {
    this.router.navigate(['/grilla-fechas'], { state: { profesional: profesional, pacienteSeleccionado: this.pacienteSeleccionado } });
  }
}