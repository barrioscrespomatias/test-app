import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/guard.guard';
import { HomeComponent } from './components/home/home/home.component';
const routes: Routes = [
  //normal loading (componentes)
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  // lazy loading (modulos)
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
