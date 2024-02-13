import { Injectable } from '@angular/core';
import { LoginRepositorioService } from '../../repositorio/login/login-repositorio.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private loginRepositorioService: LoginRepositorioService
    
  ) {}

  // async LogsLoginByUser (email:string) {
  //   return this.loginRepositorioService.LogsLoginByUser(email);
  // }
  async getAll () {
    return this.loginRepositorioService.getAll();
  }

    async LoginsPorUsuario (email:string) {
    return this.loginRepositorioService.LoginsPorUsuario(email);
  }
}
