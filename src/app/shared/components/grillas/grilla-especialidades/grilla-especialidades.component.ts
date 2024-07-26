import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { EspecialidadV2Service } from 'src/app/servicios/v2/especialidad-v2.service';
import { EspecialidadComponent } from "../../entidades/especialidad/especialidad.component";
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { NavComponent } from 'src/app/components/nav/nav/nav.component';
import { Router, RouterLink } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { UsuarioV2Service } from 'src/app/servicios/v2/usuario-v2.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioComponent } from "../../entidades/usuario/usuario.component";

@Component({
  selector: 'app-grilla-especialidades',
  standalone: true,
  imports: [EspecialidadComponent,
    CommonModule,
    NavComponent,
    RouterLink, UsuarioComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './grilla-especialidades.component.html',
  styleUrl: './grilla-especialidades.component.css'
})
export class GrillaEspecialidadesComponent {
  constructor(private especialidadService: EspecialidadV2Service,
    private translate: TranslateService,
    private router: Router,
    private firebaseService:FirebaseAuthService,
    private usuarioService: UsuarioV2Service,
  ) {
  }

  @Output() messageEvent = new EventEmitter<string>();

  especialidades: Especialidad[] = [];
  pacientes: Usuario[] = [];
  medium: string = 'round-image-medium';
  small: string = 'round-image-small';
  large: string = 'round-image-large';

  isLogged: boolean = false;
  languageEnabled: boolean = false;
  userSelected: string = '';
  currentUser!:any;
  renderHtml:boolean = false;
  mail: string = this.firebaseService.userName;

  sendMessage(profesion: string) {
    this.messageEvent.emit(profesion);
  }

  async ngOnInit(): Promise<void> {
    console.log(this.userSelected)
    this.checkLoggedIn();
    this.currentUser = await this.usuarioService.getUsuario(this.mail);
    if(this.currentUser){
      this.especialidadService.traerEspecialidades().subscribe((t) => {
        this.especialidades = t as Especialidad[];
      });
  
      this.usuarioService.traerUsuarioPorPerfil('paciente').subscribe((t) => {
        this.pacientes = t as Usuario[];
      });

      this.renderHtml = true;

    }
  }

  receiveMessage(idioma: string) {
    this.translate.setDefaultLang(idioma);
  }

  navigateToGrillaProfesionales(profesion: string) {
    this.router.navigate(['/grilla-profesionales'], { state: { profesion: profesion, pacienteSeleccionado: this.userSelected } });
  }

  seleccionarPaciente(pacienteSeleccionado: string) {
    this.userSelected = pacienteSeleccionado;
  }

  async checkLoggedIn() {
    this.isLogged = await this.firebaseService.isLoggedIn();
  }
}
