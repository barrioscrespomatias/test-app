import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosProfesionalesPipe } from '../../pipes/filtroUsuariosProfesionales/usuarios-profesionales.pipe';



@NgModule({
  declarations: [
    UsuariosComponent,
    UsuariosProfesionalesPipe
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
  ]
})
export class UsuariosModule { }
