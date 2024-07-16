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
import { Turno } from '../../interfaces/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoV2Service {
  sesionFirestore!: Turno;
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

  coleccionTurnos: CollectionReference<DocumentData> = collection(
    this.firestore,
    'turnos'
  );

  //#region ABM


  /**
   * Modifica la Turno y devuelve una promesa cuando lo logre la modificacion
   * @param user
   * @returns
   */
  modificar(Turno: Turno): Promise<void> {
    const documento = doc(this.coleccionTurnos, Turno.docRef);

    return updateDoc(documento, { ...Turno });
  }

  //#endregion

  //#region Manipulacion de informción

  /**
   * GetAll Turnos
   * @returns
   */
  traerTurnos() {
    const TurnoQuery = query(
      this.coleccionTurnos,
      orderBy('fecha', 'desc')
    );
    return collectionData(TurnoQuery) as Observable<Turno[]>;
  }

  /**
   * Trae todas las Turnos por estado
   * @param estado
   * @returns
   */
  traerTurnoPorEstado(estadoTurno: string) {
    const usuarios = query(
      this.coleccionTurnos,
      where('estado', '==', estadoTurno)
    );
    return collectionData(usuarios) as Observable<any[]>;
  }

  /**
   * Trae todas las Turnos hechas por paciente
   * @param paciente
   * @returns
   */
  buscarTurnoPorPaciente(paciente: string) {
    const usuarios = query(
      this.coleccionTurnos,
      where('paciente', '==', paciente),
      orderBy('fecha', 'desc')
    );
    return collectionData(usuarios) as Observable<any[]>;
  }
}
