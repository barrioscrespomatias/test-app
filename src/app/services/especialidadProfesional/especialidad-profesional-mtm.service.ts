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
import { EspecialidadProfesionalMtm } from 'src/app/clases/manyToMany/especialidadProfesionalMtm/especialidad-profesional-mtm';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadProfesionalMtmService {
  constructor(private firestore: Firestore) {}

  public async guardar(especialidadProfesional: EspecialidadProfesionalMtm) {
    const coleccion = collection(this.firestore, 'MTM_especialidadProfesional');

    const documentoNuevo = doc(coleccion);
    const nuevoId = documentoNuevo.id;
    const usuariosRef = collection(
      this.firestore,
      'MTM_especialidadProfesional'
    );

    await setDoc(doc(usuariosRef), {
      id: nuevoId,
      escialidadId: especialidadProfesional.especialidadId,
      profesionalId: especialidadProfesional.profesionalId,
      fechaCreacion: especialidadProfesional.fechaCreacion,
      ultimaModificacion: especialidadProfesional.ultimaModificacion,
      borrado: especialidadProfesional.borrado,
      descripcion: especialidadProfesional.descripcion,
    });
    alert('especialidad profesional creado')
  }

  async traer() {
    const coleccion = collection(this.firestore, 'MTM_especialidadProfesional');
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
    const querySnapshot = await getDocs(
      collection(this.firestore, 'MTM_especialidadProfesional')
    );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      console.log(doc.data());
    });
  }

  async traerUno() {
    // Traer uno especifico
    const docRef = doc(this.firestore, 'MTM_especialidadProfesional', 'SF'); //--> obtener uno especifico
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  modificar(usuario: EspecialidadProfesionalMtm) {
    const coleccion = collection(this.firestore, 'MTM_especialidadProfesional');
    const documento = doc(coleccion, '031a7d54-3187-4aad-aa6f-1ee2ed65f00f');
    updateDoc(documento, { ...usuario });
  }
}
