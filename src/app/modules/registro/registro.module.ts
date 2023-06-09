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
import {
  RecaptchaModule,
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
  RecaptchaFormsModule,
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaV3Module,
  ReCaptchaV3Service
} from 'ng-recaptcha';

// const RECAPTCHA_V3_STACKBLITZ_KEY = '6LeHBK0bAAAAAOQVTvBOWhfb08cQfUpFoSE3FsmP';
// const RECAPTCHA_V2_DUMMY_KEY = '6Lc_scgmAAAAABK0rTUzr7v1ZbC-CF1dI3IbP-IP';
const RECAPTCHA_V3_STACKBLITZ_KEY = '6Lfli9ImAAAAAAWGXGxCckymjtBFr1k96RVl17cx';
const RECAPTCHA_V2_DUMMY_KEY = '6Lc_scgmAAAAABK0rTUzr7v1ZbC-CF1dI3IbP-IP';


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
    RecaptchaModule,
    RecaptchaFormsModule,
    RecaptchaV3Module
  ],
  providers: [
    ProfesionalService,
    EspecialidadProfesionalMtmService,
    FirebaseAuthService,
    UsuarioPerfilService,
    UsuarioFirebaseService,
    AuthService,
    ReCaptchaV3Service,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },  

    // {
    //   provide: RECAPTCHA_V3_SITE_KEY,
    //   useValue: RECAPTCHA_V3_STACKBLITZ_KEY
    // },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      //Google SITE KEY RECAPTCHA V3
      useValue: '6LdbARsnAAAAAObf00FdSTKsDgvZiV9_iADGVlgT'
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        //Google SITE KEY RECAPTCHA V2
        siteKey: '6LdeBxsnAAAAAN-yVQFgbO6xinlz4lVQM-wPE-G6'
      } as RecaptchaSettings
    }
  ],
  exports: [
    FormularioRegistroComponent // Agrega el componente en la sección de exports
  ]

  
})
export class RegistroModule {}
