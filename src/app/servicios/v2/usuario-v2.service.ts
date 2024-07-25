import { Injectable } from '@angular/core';
import {
  Auth
} from '@angular/fire/auth';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  collectionData,
  doc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import {
  Storage,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Usuario } from '../../interfaces/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioV2Service {

  sesionFirestore!: Usuario;
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
    private angularFirestore: AngularFirestore
  ) {}

  coleccionUsuarios: CollectionReference<DocumentData> = collection(
    this.firestore,
    'usuarios'
  );

  //#region ABM


  /**
   * Modifica la Turno y devuelve una promesa cuando lo logre la modificacion
   * @param user
   * @returns
   */
  modificar(usuario: Usuario): Promise<void> {
    const documento = doc(this.coleccionUsuarios, usuario.docRef);

    return updateDoc(documento, { ...usuario });
  }

  //#endregion

  //#region Manipulacion de informción

  /**
   * GetAll Turnos
   * @returns
   */
  traerUsuarios() {
    const TurnoQuery = query(
      this.coleccionUsuarios,
      orderBy('mail', 'desc')
    );
    return collectionData(TurnoQuery) as Observable<Usuario[]>;
  }

  /**
   * Trae todas las Turnos por estado
   * @param perfil
   * @returns
   */
  traerUsuarioPorPerfil(perfil: string) {
    const usuarios = query(
      this.coleccionUsuarios,
      where('perfil', '==', perfil)
    );
    return collectionData(usuarios) as Observable<any[]>;
  }

  traerUsuariosPorProfesion(especialidad: string) {
    const usuarios = query(
      this.coleccionUsuarios,
      where('perfil', '==', 'profesional'),
      where('especialidades','==', especialidad)
    );
    return collectionData(usuarios) as Observable<any[]>;
  }

  // /**
  //  * Trae todas las Turnos hechas por paciente
  //  * @param paciente
  //  * @returns
  //  */
  // buscarPorMail(mail: string) {
  //   const usuarios = query(
  //     this.coleccionUsuarios,
  //     where('mail', '==', mail)
  //   );
  //   return collectionData(usuarios) as Observable<any[]>;
  // }

  buscarUsuarioPorMail(mail: string): Promise<any>
  {
    const resultados = query(this.coleccionUsuarios, where("mail","==",mail));
    return new Promise((resolve)=>
    {
      collectionData(resultados).subscribe((a)=> {
        resolve(a[0]);
      });
    })
  }

  async getUsuario(mail: string) {
    return new Promise((resolve, reject) => {
      this.angularFirestore
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
}
