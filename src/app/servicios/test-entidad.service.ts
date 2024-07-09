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
} from '@angular/fire/firestore';
import {
  Storage,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Especialidad } from '../interfaces/especialidad';

@Injectable({
  providedIn: 'root'
})
export class TestEntidadService {

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
    const documento = doc(this.coleccionEspecialidad, especialidad.docRef);

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

  // /**
  //  * Trae todas las Especialidads por estado
  //  * @param estado
  //  * @returns
  //  */
  // traerEspecialidadPorEstado(estadoEspecialidad: EstadoEspecialidad) {
  //   const usuarios = query(
  //     this.coleccionEspecialidads,
  //     where('estado_Especialidad', '==', estadoEspecialidad)
  //   );
  //   return collectionData(usuarios) as Observable<any[]>;
  // }

  // /**
  //  * Trae todas las Especialidads hechas por usuario
  //  * @param idUsuario
  //  * @returns
  //  */
  // async buscarEspecialidadPorUsuario(idUsuario: string) {
  //   const usuarios = query(
  //     this.coleccionEspecialidads,
  //     where('idCliente', '==', idUsuario),
  //     orderBy('fecha_mensaje_emisor', 'desc')
  //   );
  //   return collectionData(usuarios) as Observable<any[]>;
  // }

  //#endregion
}
