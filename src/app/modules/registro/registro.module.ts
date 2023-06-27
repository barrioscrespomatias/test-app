import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { ImageComponentComponent } from '../../components/imageComponent/image-component/image-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OcultarElementosDirective } from 'src/app/directive/ocultarElementos/ocultar-elementos.directive';
import { FormularioRegistroComponent } from 'src/app/components/formulario/formulario-registro/formulario-registro.component';
import { EspecialidadProfesionalMtmService } from '../../services/especialidadProfesional/especialidad-profesional-mtm.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfesionalService } from 'src/app/services/profesional/profesional.service';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { UsuarioPerfilService } from 'src/app/services/usuarioPerfil/usuario-perfil.service';
import { UsuarioFirebaseService } from 'src/app/services/usuarioFirebase/usuario-firebase.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@NgModule({
  declarations: [
    RegistroComponent,
    ImageComponentComponent,
    FormularioRegistroComponent,
    OcultarElementosDirective,
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [
    ProfesionalService,
    EspecialidadProfesionalMtmService,
    FirebaseAuthService,
    UsuarioPerfilService,
    UsuarioFirebaseService,
    AuthService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  exports: [
    FormularioRegistroComponent // Agrega el componente en la sección de exports
  ]

  
})
export class RegistroModule {}
