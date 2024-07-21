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

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  // constructor(private firestore: Firestore) {}

  // public async guardar(profesional: Paciente) {
  //   const coleccion = collection(this.firestore, 'pacientes');

  //   const documentoNuevo = doc(coleccion);
  //   const nuevoId = documentoNuevo.id;
  //   const usuariosRef = collection(this.firestore, 'pacientes');

  //   await setDoc(doc(usuariosRef, nuevoId), {
  //     // Entity

  //     // id: string = "";
  //     // nombre: string = "";;
  //     // segundoNombre: string = "";;
  //     // fechaCreacion: Date = new Date();
  //     // ultimaModificacion: Date = new Date();
  //     // borrado: boolean = false;

  //     // Usuario

  //     // edad: string = "";
  //     // dni: string = "";
  //     // mail: string = "";
  //     // contrasena: string = "";
  //     // perfil: PerfilEnum = 0;

  //     // Paciente

  //     // obraSocial: string = '';

  //     //Navegacion
  //     // listadoTurnos: Turno[] = new Array(); //para navegar.
  //     // listadoImagenes: Imagen[] = new Array(); //para navegar.

  //     id: nuevoId,
  //     nombre: profesional.nombre,
  //     segundoNombre: profesional.segundoNombre,
  //     fechaCreacion: profesional.fechaCreacion,
  //     ultimaModificacion: profesional.ultimaModificacion,
  //     borrado: profesional.borrado,

  //     edad: profesional.edad,
  //     dni: profesional.dni,
  //     mail: profesional.mail,
  //     contrasena: profesional.contrasena,
  //     perfil: profesional.perfil,

  //     obraSocial: profesional.obraSocial,
  //   });
  // }

  // async traer() {
  //   const coleccion = collection(this.firestore, 'pacientes');
  //   //#region Observable
  //   //Observable es un dato que puede 'observar de la base de datos'
  //   const respuestaObservable = collectionData(coleccion);
  //   //Tener cuidado porque las suscripciones son acumulativas.

  //   // const suscripcion =  respuestaObservable.subscribe((informacion) => {
  //   //   this.listado = informacion;
  //   // });

  //   // respuestaObservable.subscribe((informacion) => {
  //   //   this.listado = informacion;
  //   // });

  //   // Sirve el subscribe pero no siempre es necesario. Se debe hacer un unsubscribe
  //   // suscripcion.unsubscribe();

  //   //#endregion

  //   //Todos con query
  //   const querySnapshot = await getDocs(
  //     collection(this.firestore, 'pacientes')
  //   );
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //   });
  // }

  // async traerUno() {
  //   // Traer uno especifico
  //   const docRef = doc(this.firestore, 'pacientes', 'SF'); //--> obtener uno especifico
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //   }
  // }

  // modificar(usuario: Paciente) {
  //   const coleccion = collection(this.firestore, 'pacientes');
  //   const documento = doc(coleccion, '031a7d54-3187-4aad-aa6f-1ee2ed65f00f');
  //   updateDoc(documento, { ...usuario });
  // }
}
