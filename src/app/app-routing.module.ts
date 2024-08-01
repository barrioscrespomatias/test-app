import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/guard.guard';
import { HomeComponent } from './components/home/home/home.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { TablaHistoriasClinicasComponent } from './components/tabla-historias-clinicas/tabla-historias-clinicas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { EncuestaSatisfaccionComponent } from './components/encuesta-satisfaccion/encuesta-satisfaccion.component';
import { UsuarioComponent } from './shared/components/entidades/usuario/usuario.component';
import { InformesComponent } from './components/graficos/informes/informes.component';
import { GrillaUsuariosComponent } from './shared/components/grillas/grilla-usuarios/grilla-usuarios.component';
import { AsignarHorarioComponent } from './components/profesional/asignar-horario/asignar-horario.component';
import { GrillaHorariosComponent } from './components/profesional/grilla-horarios/grilla-horarios.component';
import { TablaTurnosComponent } from './components/tabla-turnos/tabla-turnos.component';
import { GraficosPageComponent } from './components/graficos-page/graficos-page.component';
import { RegistroComponent } from './modules/registro/registro.component';
import { LoginComponent } from './modules/login/login.component';
import { GrillaEspecialidadesComponent } from './shared/components/grillas/grilla-especialidades/grilla-especialidades.component';
import { GrillaProfesionalesComponent } from './shared/components/grillas/grilla-profesionales/grilla-profesionales.component';
import { GrillaFechasComponent } from './shared/components/grillas/grilla-fechas/grilla-fechas.component';
import { GrillaHorariosTurnosComponent } from './shared/components/grillas/grilla-horarios-turnos/grilla-horarios-turnos.component';
import { AgregarEspecialidadComponent } from './components/agregar-especialidad/agregar-especialidad.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'perfil', component: MiPerfilComponent, canActivate: [AuthGuard] },
  { path: 'historias-clinicas', component: TablaHistoriasClinicasComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'solicitar-turno', component: SolicitarTurnoComponent, canActivate: [AuthGuard]},
  { path: 'asignar-horario', component: AsignarHorarioComponent, canActivate: [AuthGuard] },
  { path: 'grilla-horarios', component: GrillaHorariosComponent, canActivate: [AuthGuard] },
  { path: 'grilla-turnos', component: TablaTurnosComponent, canActivate: [AuthGuard] },
  { path: 'mi-perfil', component: MiPerfilComponent, canActivate: [AuthGuard] },
  { path: 'graficos', component: GraficosPageComponent, canActivate: [AuthGuard] },
  { path: 'registro', component: RegistroComponent},



  { path: 'encuesta-satisfaccion', component: EncuestaSatisfaccionComponent, canActivate: [AuthGuard]},
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard]},
  { path: 'informes', component: InformesComponent, canActivate: [AuthGuard]},
  { path: 'grilla-usuarios', component: GrillaUsuariosComponent, canActivate: [AuthGuard]},
  { path: 'grilla-especialidades', component: GrillaEspecialidadesComponent, canActivate: [AuthGuard]},
  { path: 'grilla-profesionales', component: GrillaProfesionalesComponent, canActivate: [AuthGuard]},
  { path: 'grilla-fechas', component: GrillaFechasComponent, canActivate: [AuthGuard]},
  { path: 'grilla-horarios-turnos', component: GrillaHorariosTurnosComponent, canActivate: [AuthGuard]},
  { path: 'agregar-especialidad', component: AgregarEspecialidadComponent, canActivate: [AuthGuard]},
  { path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
