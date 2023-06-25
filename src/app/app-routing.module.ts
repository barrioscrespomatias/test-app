import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/guard.guard';
import { HomeComponent } from './components/home/home/home.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { TablaHistoriasClinicasComponent } from './components/tabla-historias-clinicas/tabla-historias-clinicas.component';
const routes: Routes = [
  //normal loading
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: MiPerfilComponent, canActivate: [AuthGuard] },
  { path: 'historias-clinicas', component: TablaHistoriasClinicasComponent, canActivate: [AuthGuard] },

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
    path: 'usuarios',
    loadChildren: () =>
      import('./modules/usuarios/usuarios.module').then(
        (m) => m.UsuariosModule
      ),
  },
  {
    path: 'gestionUsuarios',
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
