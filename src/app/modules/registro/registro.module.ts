import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { ImageComponentComponent } from '../../components/imageComponent/image-component/image-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MostrarElementDirective } from 'src/app/directive/mostrarElemento/mostrar-element.directive';
import { OcultarElementosDirective } from 'src/app/directive/ocultarElementos/ocultar-elementos.directive';
import { FormularioRegistroComponent } from 'src/app/components/formulario/formulario-registro/formulario-registro.component';
import { EspecialidadProfesionalMtmService } from '../../services/especialidadProfesional/especialidad-profesional-mtm.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { EspecialidadService } from 'src/app/services/especialidad/especialidad.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfesionalService } from 'src/app/services/profesional/profesional.service';
import { FormularioCrearEspecialidadComponent } from '../../components/formulario/formulario-crear-especialidad/formulario-crear-especialidad/formulario-crear-especialidad.component';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { UsuarioPerfilService } from 'src/app/services/usuarioPerfil/usuario-perfil.service';
import { PreRegistroComponent } from 'src/app/components/preRegistro/pre-registro/pre-registro.component';
import { UsuarioFirebaseService } from 'src/app/services/usuarioFirebase/usuario-firebase.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@NgModule({
  declarations: [
    RegistroComponent,
    ImageComponentComponent,
    FormularioRegistroComponent,
    MostrarElementDirective,
    OcultarElementosDirective,
    FormularioCrearEspecialidadComponent,
    PreRegistroComponent,
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [
    EspecialidadService,
    ProfesionalService,
    EspecialidadProfesionalMtmService,
    FirebaseAuthService,
    UsuarioPerfilService,
    UsuarioFirebaseService,
    AuthService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
})
export class RegistroModule {}
