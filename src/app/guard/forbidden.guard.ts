import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { FirebaseAuthService } from '../services/angularFire/angular-fire.service';
import { UsuarioService } from '../servicios/entidades/usuario/usuario.service';

export class forbidden  implements CanActivate {
  constructor(public authService: FirebaseAuthService, public router: Router) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // const logueado = await this.authService.isLoggedIn();
    return false;
    // if (logueado != true) {
    //   this.router.navigate(['']);
    //   return false;
    // }
    // return true;
  }

}
