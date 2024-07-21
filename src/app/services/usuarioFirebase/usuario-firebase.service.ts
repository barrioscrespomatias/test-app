import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { FirebaseAuthService } from '../angularFire/angular-fire.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioFirebaseService {

  constructor(private firestore: Firestore,  private firebaseService: FirebaseAuthService) {}  

  async TraerPorEmail(mail: string) {
    
    const coleccion = collection(this.firestore, 'users');
    const consulta = query(coleccion, where('email', '==', mail));
    return collectionData(consulta);
  }

  // async traerUno(usuarioId:string) {
  //   // Traer uno especifico
  //   const coleccion = collection(this.firestore, 'profesionales');
  //   const documento = doc(coleccion, usuarioId);
  // }

  // modificar(usuario: Profesional) {
  //   const coleccion = collection(this.firestore, 'profesionales');
  //   const documento = doc(coleccion, '031a7d54-3187-4aad-aa6f-1ee2ed65f00f');
  //   updateDoc(documento, { ...usuario });
  // }

  async TraerTodo() {
    var fecha : Date = new Date()
    const coleccion = collection(this.firestore, 'users');
    // const consulta = query(coleccion, where('borrado', '!=', false));
    const consulta = query(coleccion, where('emailVerified', '==', true));
    return collectionData(consulta);
  }
}
