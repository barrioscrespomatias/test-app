import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionUsuariosRoutingModule } from './gestion-usuarios-routing.module';
import { GestionUsuariosComponent } from './gestion-usuarios.component';
import { GrillaHorariosComponent } from '../../components/profesional/grilla-horarios/grilla-horarios.component';
import { AsignarHorarioComponent } from '../../components/profesional/asignar-horario/asignar-horario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HorarioPipe } from '../../pipes/horario.pipe';
import { MostrarElementDirective } from '../../directive/mostrarElemento/mostrar-element.directive';


@NgModule({
  declarations: [
    GestionUsuariosComponent,
    GrillaHorariosComponent,
    AsignarHorarioComponent,
    HorarioPipe,
    MostrarElementDirective
  ],
  imports: [
    CommonModule,
    GestionUsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GestionUsuariosModule { }
