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
import { EncuestaSatisfaccion } from '../../interfaces/encuesta-satisfaccion';

@Injectable({
  providedIn: 'root'
})
export class EncuestaSatisfaccionService {


  sesionFirestore!: EncuestaSatisfaccion;
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

  coleccionencuestaSatisfaccion: CollectionReference<DocumentData> = collection(
    this.firestore,
    'encuestaSatisfaccion'
  );

  //#region ABM

  /**
   * Guarda una encuestaSatisfaccion y devuelve una promesa que sera resuelta cuando se logre la insercion
   * @param encuestaSatisfaccion
   * @returns
   */
  async guardarencuestaSatisfaccion(encuestaSatisfaccion: EncuestaSatisfaccion): Promise<void> {
    const documento = doc(this.coleccionencuestaSatisfaccion);
    const id = documento.id;

    return setDoc(documento, {
      id: id,
      userEmail: encuestaSatisfaccion.userEmail,
      calificacionGeneral : encuestaSatisfaccion.calificacionGeneral,
      recomendacion : encuestaSatisfaccion.recomendacion,
      observacion : encuestaSatisfaccion.observacion,
      simplicidadTurnos : encuestaSatisfaccion.simplicidadTurnos,
      amabilidad : encuestaSatisfaccion.amabilidad,
      fecha: encuestaSatisfaccion.fecha,
      aspectosDestacar: encuestaSatisfaccion.aspectosDestacar
    });
  }

  /**
   * Modifica la encuestaSatisfaccion y devuelve una promesa cuando lo logre la modificacion
   * @param user
   * @returns
   */
  modificar(encuestaSatisfaccion: EncuestaSatisfaccion): Promise<void> {
    const documento = doc(this.coleccionencuestaSatisfaccion, encuestaSatisfaccion.id);

    return updateDoc(documento, { ...encuestaSatisfaccion });
  }

  //#endregion

  //#region Manipulacion de informción

  /**
   * GetAll encuestaSatisfaccions
   * @returns
   */
  traerencuestaSatisfacciones() {
    const encuestaSatisfaccionQuery = query(
      this.coleccionencuestaSatisfaccion,
      orderBy('fecha', 'desc')
    );
    return collectionData(encuestaSatisfaccionQuery) as Observable<EncuestaSatisfaccion[]>;
  }

  /**
   * Trae todas las encuestaSatisfaccions por estado
   * @param estado
   * @returns
   */
  traerencuestaSatisfaccionPorUsuario(email: string) {
    const usuarios = query(
      this.coleccionencuestaSatisfaccion,
      where('userEmail', '==', email)
    );
    return collectionData(usuarios) as Observable<any[]>;
  }

  // /**
  //  * Trae todas las encuestaSatisfaccions hechas por usuario
  //  * @param idUsuario
  //  * @returns
  //  */
  // async buscarencuestaSatisfaccionPorUsuario(idUsuario: string) {
  //   const usuarios = query(
  //     this.coleccionencuestaSatisfaccions,
  //     where('idCliente', '==', idUsuario),
  //     orderBy('fecha_mensaje_emisor', 'desc')
  //   );
  //   return collectionData(usuarios) as Observable<any[]>;
  // }

  //#endregion
}
