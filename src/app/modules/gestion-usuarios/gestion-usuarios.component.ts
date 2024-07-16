import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { UsuarioService } from 'src/app/servicios/entidades/usuario/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GraficosPageComponent } from 'src/app/components/graficos-page/graficos-page.component';
import { AsignarHorarioComponent } from 'src/app/components/profesional/asignar-horario/asignar-horario.component';
import { GrillaHorariosComponent } from 'src/app/components/profesional/grilla-horarios/grilla-horarios.component';
import { SolicitarTurnoComponent } from 'src/app/components/solicitar-turno/solicitar-turno.component';
import { MostrarElementDirective } from 'src/app/directive/mostrarElemento/mostrar-element.directive';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css'],
  standalone: true,
  imports:[CommonModule, 
           GraficosPageComponent,
           AsignarHorarioComponent,
           MostrarElementDirective,
          //  GrillaHorariosComponent,
          //  SolicitarTurnoComponent,

          ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
})
export class GestionUsuariosComponent {
  //#region Propiedades
  usuario: any;
  mail: string = this.firebaseService.userName;
  componenteVisible: string = 'tabla-turnos';

  //#endregion

  //#region Constructor

  constructor(
    private usuarioService: UsuarioService,
    private firebaseService: FirebaseAuthService
  ) {}

  //#endregion
  //#region Hooks
  async ngOnInit() {

    this.usuarioService.getUsuario(this.mail).then((usuario: any) => {
      this.usuario = usuario;
      if(this.usuario?.perfil != 'profesional')
      this.componenteVisible = 'solicitar-turno'
    });

  }
  //#endregion

  SignOut() {
    this.firebaseService.SignOut();
  }
}
