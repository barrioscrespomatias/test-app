import { Injectable } from '@angular/core';
import { SweetAlertService } from 'src/app/servicios/sweet-alert/sweet-alert.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';
import { UsuarioService } from '../servicios/entidades/usuario/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: FirebaseAuthService, 
    public router: Router, private usuarioService: UsuarioService,
    private firebaseService: FirebaseAuthService,
    private sweetAlert: SweetAlertService,) {}

  // mail: string = '';
  usuario!:any;

 

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const logueado = await this.authService.isLoggedIn();
    const email = await this.firebaseService.GetEmailLogueado();    
    const userLogueado = await this.firebaseService.GetUserLogueado();  
  
    try {
      this.usuario = await this.usuarioService.getUsuario(email);
    
      if (this.usuario && userLogueado.emailVerified) 
      {
        if ((this.usuario?.perfil === 'profesional' && !this.usuario?.habilitado) || logueado !== true) 
        {
          
          this.router.navigate(['']);
    
          if (this.usuario?.perfil !== 'profesional')
            this.sweetAlert.MensajeError('Valide su correo electrónico para tener acceso.');
          else
            this.sweetAlert.MensajeError('No ha validado su correo electrónico o no se encuentra habilitado para acceder.');
    
          return false;
        } 
        else 
        {
          return true;
        }
      }
      else if(!this.usuario.emailVerified){
        this.sweetAlert.MensajeError('Debe validar su correo electronico.');
        return false;
      }

      return false;
    } finally {
      this.usuario = null; // Borrar el objeto this.usuario
    }
  }
}
