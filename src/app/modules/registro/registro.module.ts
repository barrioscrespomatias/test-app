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
import { NgSelectModule } from "@ng-select/ng-select";
import { ProfesionalService } from 'src/app/services/profesional/profesional.service';
import { FormularioCrearEspecialidadComponent } from '../../components/formulario/formulario-crear-especialidad/formulario-crear-especialidad/formulario-crear-especialidad.component';

@NgModule({
  declarations: [
    RegistroComponent,
    ImageComponentComponent,
    FormularioRegistroComponent,
    MostrarElementDirective,
    OcultarElementosDirective,
    FormularioCrearEspecialidadComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [EspecialidadService, ProfesionalService, EspecialidadProfesionalMtmService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
})
export class RegistroModule {}
