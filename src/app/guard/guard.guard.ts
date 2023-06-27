import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from 'src/app/services/angularFire/angular-fire.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: FirebaseAuthService, public router: Router) {}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    console.log('por aca pasa')
    const logueado = await this.authService.isLoggedIn();
    
    if (logueado != true) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
