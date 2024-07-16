import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/guard.guard';
import { HomeComponent } from './components/home/home/home.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { TablaHistoriasClinicasComponent } from './components/tabla-historias-clinicas/tabla-historias-clinicas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { EncuestaSatisfaccionComponent } from './components/encuesta-satisfaccion/encuesta-satisfaccion.component';
import { UsuarioComponent } from './shared/components/usuario/usuario.component';
import { InformesComponent } from './components/graficos/informes/informes.component';
import { GrillaUsuariosComponent } from './shared/components/grilla-usuarios/grilla-usuarios.component';
import { AsignarHorarioComponent } from './components/profesional/asignar-horario/asignar-horario.component';
import { GrillaHorariosComponent } from './components/profesional/grilla-horarios/grilla-horarios.component';
import { TablaTurnosComponent } from './components/tabla-turnos/tabla-turnos.component';
import { GraficosPageComponent } from './components/graficos-page/graficos-page.component';

const routes: Routes = [
  //normal loading
  { path: 'home', component: HomeComponent},
  { path: 'perfil', component: MiPerfilComponent, canActivate: [AuthGuard] },
  { path: 'historias-clinicas', component: TablaHistoriasClinicasComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'solicitar-turno', component: SolicitarTurnoComponent},
  { path: 'asignar-horario', component: AsignarHorarioComponent },
  { path: 'grilla-horarios', component: GrillaHorariosComponent },
  { path: 'grilla-turnos', component: TablaTurnosComponent },
  { path: 'mi-perfil', component: MiPerfilComponent },
  { path: 'graficos', component: GraficosPageComponent },


  { path: 'encuesta-satisfaccion', component: EncuestaSatisfaccionComponent},
  { path: 'usuario', component: UsuarioComponent},
  { path: 'informes', component: InformesComponent},
  { path: 'grilla-usuarios', component: GrillaUsuariosComponent},
  // lazy loading
  {
    path: '',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./modules/registro/registro.module').then(
        (m) => m.RegistroModule
      ),
  },
  {
    path: 'gestionUsuarios',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/gestion-usuarios/gestion-usuarios.module').then(
        (m) => m.GestionUsuariosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
