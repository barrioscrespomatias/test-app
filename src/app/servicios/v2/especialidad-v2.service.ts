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
import { Especialidad } from '../../interfaces/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadV2Service {


  sesionFirestore!: Especialidad;
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

  coleccionEspecialidad: CollectionReference<DocumentData> = collection(
    this.firestore,
    'especialidades'
  );

  //#region ABM

  /**
   * Guarda una Especialidad y devuelve una promesa que sera resuelta cuando se logre la insercion
   * @param Especialidad
   * @returns
   */
  async guardarEspecialidad(especialidad: Especialidad): Promise<void> {
    const documento = doc(this.coleccionEspecialidad);
    const id = documento.id;

    return setDoc(documento, {
      id: id,
      nombre: especialidad.nombre,
      path : especialidad.path
    });
  }

  /**
   * Modifica la Especialidad y devuelve una promesa cuando lo logre la modificacion
   * @param user
   * @returns
   */
  modificar(especialidad: Especialidad): Promise<void> {
    const documento = doc(this.coleccionEspecialidad, especialidad.id);

    return updateDoc(documento, { ...especialidad });
  }

  //#endregion

  //#region Manipulacion de informción

  /**
   * GetAll Especialidads
   * @returns
   */
  traerEspecialidades() {
    const EspecialidadQuery = query(
      this.coleccionEspecialidad,
      orderBy('nombre', 'desc')
    );
    return collectionData(EspecialidadQuery) as Observable<Especialidad[]>;
  }
  //#endregion
}
