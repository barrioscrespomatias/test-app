import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
} from '@angular/fire/auth';

import { BehaviorSubject, Subject, Subscription, Observable } from 'rxjs';
import { UsuarioRepositorioService } from '../../repositorio/usuario/usuario-repositorio.service';
import { FirebaseError } from '@angular/fire/app';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  listadoUsuariosModelo?: Usuario[];
  subscription?: Subscription;
  //#region Constructor
  constructor(
    private afAuth: Auth,
    private usuariosRepository: UsuarioRepositorioService,
    private _router: Router,
    private db: AngularFirestore
  ) {
    // if (!this.subscription) {
    //   this.subscription = this.usuariosRepository.listadoUsuarios$.subscribe(
    //     (data) => {
    //       this.listadoUsuariosModelo = data;
    //     }        
    //   );
    //   this.subscription.unsubscribe();
    // }
  }
  //#endregion

  //#region Métodos
  //metodo encargado de registrar un usuario que viene en el componente register
  async Crear(
    usuarioRegistro: Usuario
  ): Promise<{ mensaje: string; valido: boolean }> {
    console.log(usuarioRegistro)
    debugger
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.afAuth,
        usuarioRegistro.mail,
        usuarioRegistro.contrasena
      );

      let userDocRef = this.usuariosRepository.create(
        usuarioRegistro,
        // userCredential.user.uid,
        usuarioRegistro.mail
      );

      await sendEmailVerification(userCredential.user);

      return {
        mensaje: 'Usuario creado correctamente, por favor verifica el mail',
        valido: true,
      };
    } catch (err) {
      let errorMensaje = 'Hubo un error al intentar registrarte';
      if (err instanceof FirebaseError) {
        if (err.code == 'auth/email-already-in-use') {
          errorMensaje = 'El email ingresado ya existe, ingrese otro';
        }
      }
      return { mensaje: errorMensaje, valido: false };
    }
  }

  async TraerTodos() {
    return this.usuariosRepository.getAll();
  }

  async Modificar(docRefusuarioId: string, usuario: Usuario): Promise<{ mensaje: string; valido: boolean }> {
    try {

      this.usuariosRepository.update(docRefusuarioId, usuario);  


      return {
        mensaje: 'Usuario modificado correctamente, por favor verifica el mail',
        valido: true,
      };
    } catch (err) {
      let errorMensaje = 'Hubo un error al intentar modificar';
      if (err instanceof FirebaseError) {
        if (err.code == 'auth/email-already-in-use') {
          errorMensaje = 'El email ingresado ya existe, ingrese otro';
        }
      }
      return { mensaje: errorMensaje, valido: false };
    }
  }

  // async Modificar(docRefusuarioId: string, usuario: Usuario) {
  //   return this.usuariosRepository.update(docRefusuarioId, usuario);
  // }

  async getUsuario(mail: string) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('usuarios')
        .doc(mail)
        .valueChanges()
        .subscribe(
          (datos) => {
            resolve(datos);
          },
          (error) => reject(error)
        );
    });
  } 

  //#endregion
}
