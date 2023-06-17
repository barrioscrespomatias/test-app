import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor(private firestore: Firestore) {}

  // public async guardar(especialidad: Especialidad) {
  //   const coleccion = collection(this.firestore, 'especialidades');

  //   const documentoNuevo = doc(coleccion);
  //   const nuevoId = documentoNuevo.id;
  //   const usuariosRef = collection(this.firestore, 'especialidades');

  //   await setDoc(doc(usuariosRef, nuevoId), {
  //     // Entity

  //     // id: string = "";
  //     // nombre: string = "";;
  //     // segundoNombre: string = "";;
  //     // fechaCreacion: Date = new Date();
  //     // ultimaModificacion: Date = new Date();
  //     // borrado: boolean = false;      

  //     //Navegacion
  //     // listadoProfesionales: Profesional[] = new Array(); //para navegar.

  //     id: nuevoId,
  //     nombre: especialidad.nombre,
  //     segundoNombre: especialidad.segundoNombre,
  //     fechaCreacion: especialidad.fechaCreacion,
  //     ultimaModificacion: especialidad.ultimaModificacion,
  //     borrado: especialidad.borrado
  //   });
  // }

  // async traer() {
  //   const coleccion = collection(this.firestore, 'especialidades');
  //   //#region Observable
  //   //Observable es un dato que puede 'observar de la base de datos'
  //   const respuestaObservable = collectionData(coleccion);
  //   //Tener cuidado porque las suscripciones son acumulativas.

  //   // const suscripcion =  respuestaObservable.subscribe((informacion) => {
  //   //   this.listado = informacion;
  //   //   console.log(this.listado)
  //   //   console.log(informacion);
  //   // });

  //   // respuestaObservable.subscribe((informacion) => {
  //   //   this.listado = informacion;
  //   // });

  //   // Sirve el subscribe pero no siempre es necesario. Se debe hacer un unsubscribe
  //   // suscripcion.unsubscribe();

  //   //#endregion

  //   //Todos con query
  //   const querySnapshot = await getDocs(collection(this.firestore, 'especialidades'));
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     // console.log(doc.id, " => ", doc.data());
  //     console.log(doc.data());
  //   });
  // }

  // async traerUno() {
  //   // Traer uno especifico
  //   const docRef = doc(this.firestore, 'especialidades', 'SF'); //--> obtener uno especifico
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log('Document data:', docSnap.data());
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log('No such document!');
  //   }
  // }

  // modificar(usuario: Especialidad) {
  //   const coleccion = collection(this.firestore, 'especialidades');
  //   const documento = doc(coleccion, '031a7d54-3187-4aad-aa6f-1ee2ed65f00f');
  //   updateDoc(documento, { ...usuario });
  // }

  // async TraerPorFechaMayor(fecha: Date) {
    
  //   const coleccion = collection(this.firestore, 'especialidades');
  //   const consulta = query(coleccion, where('fecha', '>', fecha));
  //   return collectionData(consulta);
  // }

  async TraerTodo() {
    var fecha : Date = new Date()
    const coleccion = collection(this.firestore, 'especialidades');
    // const consulta = query(coleccion, where('borrado', '!=', false));
    const consulta = query(coleccion, where('fechaCreacion', '<', fecha));
    return collectionData(consulta);
  }
}
