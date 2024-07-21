import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { FirebaseAuthService } from '../services/angularFire/angular-fire.service';
import { UsuarioService } from '../servicios/entidades/usuario/usuario.service';
import { Observable } from 'rxjs';

export class forbidden  implements CanActivate {
  constructor(public authService: FirebaseAuthService, 
              public router: Router, private usuarioService: UsuarioService,
              private firebaseService: FirebaseAuthService,) {}

  usuario!:any;
  mail: string = this.firebaseService.userName;
  
  // async canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Promise<boolean> {
  //   const logueado = await this.authService.isLoggedIn();
  //   if (logueado != true) {
  //     this.router.navigate(['']);
  //     return false;
  //   }
  //   return true;
  // }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.usuarioService.getUsuario(this.mail).then((usuario: any) => {
        this.usuario = usuario;
      });
      
      if(this.usuario?.perfil != 'profesional'){
        return true;
      }
      else
      return false;
  }

}
