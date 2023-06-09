import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { disableDebugTools } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  listado: any[] = [];
  constructor(private firestore: Firestore) {}

  async guardar(usuario: string) {
    const coleccion = collection(this.firestore, 'log-users');

    const documentoNuevo = doc(coleccion);
    const nuevoId = documentoNuevo.id;
    const usuariosRef = collection(this.firestore, 'log-users');

    await setDoc(doc(usuariosRef, nuevoId), {
      usuario: usuario,
      fecha: Date.now(),
      id: nuevoId,
    });
  }

  async traer() {
    const coleccion = collection(this.firestore, 'usuarios');
    //#region Observable
    //Observable es un dato que puede 'observar de la base de datos'
    const respuestaObservable = collectionData(coleccion);
    //Tener cuidado porque las suscripciones son acumulativas.

    // const suscripcion =  respuestaObservable.subscribe((informacion) => {
    //   this.listado = informacion;
    //   console.log(this.listado)
    //   console.log(informacion);
    // });

    // respuestaObservable.subscribe((informacion) => {
    //   this.listado = informacion;
    // });

    // Sirve el subscribe pero no siempre es necesario. Se debe hacer un unsubscribe
    // suscripcion.unsubscribe();

    //#endregion

    //Todos con query
    // const querySnapshot = await getDocs(collection(this.firestore, "usuarios"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   // console.log(doc.id, " => ", doc.data());
    //   console.log(doc.data());
    // });
  }

  // async traerUno(){

  //   // Traer uno especifico
  //   const docRef = doc(this.firestore, "usuarios", "SF"); //--> obtener uno especifico
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // }

  // modificar(usuario : Persona) {
  //   const coleccion = collection(this.firestore, 'usuarios');
  //   const documento = doc(coleccion, '031a7d54-3187-4aad-aa6f-1ee2ed65f00f')
  //   updateDoc(documento, {...usuario});
  // }
}
