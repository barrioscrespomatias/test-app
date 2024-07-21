import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioPerfilService {

  constructor(private firestore: Firestore) {}

  // public async guardar(usuarioPerfil: UsuarioPerfil) {
  //   const coleccion = collection(this.firestore, 'usuarioPerfil');

  //   const documentoNuevo = doc(coleccion);
  //   const nuevoId = documentoNuevo.id;
  //   const usuariosRef = collection(
  //     this.firestore,
  //     'usuarioPerfil'
  //   );

  //   await setDoc(doc(usuariosRef), {
  //     id: nuevoId,
  //     firebaseUserId: usuarioPerfil.firebaseUserId,
  //     profesionalId: usuarioPerfil.profesionalId,      
  //     pacienteId: usuarioPerfil.pacienteId,      
  //   });
  // }

  async traer() {
    const coleccion = collection(this.firestore, 'usuarioPerfil');
    //#region Observable
    //Observable es un dato que puede 'observar de la base de datos'
    const respuestaObservable = collectionData(coleccion);
    //Tener cuidado porque las suscripciones son acumulativas.

    // const suscripcion =  respuestaObservable.subscribe((informacion) => {
    //   this.listado = informacion;
    // });

    // respuestaObservable.subscribe((informacion) => {
    //   this.listado = informacion;
    // });

    // Sirve el subscribe pero no siempre es necesario. Se debe hacer un unsubscribe
    // suscripcion.unsubscribe();

    //#endregion

    //Todos con query
    const querySnapshot = await getDocs(
      collection(this.firestore, 'usuarioPerfil')
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
    });
  }

  async traerUno() {
    // Traer uno especifico
    const docRef = doc(this.firestore, 'usuarioPerfil', 'SF'); //--> obtener uno especifico
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    } else {
      // docSnap.data() will be undefined in this case
    }
  }

  // modificar(usuario: UsuarioPerfil) {
  //   const coleccion = collection(this.firestore, 'usuarioPerfil');
  //   const documento = doc(coleccion, '031a7d54-3187-4aad-aa6f-1ee2ed65f00f');
  //   updateDoc(documento, { ...usuario });
  // }
}
