import { Injectable } from '@angular/core';
import {
  Auth
} from '@angular/fire/auth';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  Timestamp,
  collection,
  collectionData,
  deleteDoc,
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
import * as moment from 'moment';

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

  /**
   * Trae todos los turnos disponibles del profesional
   * @param profesional
   * @returns
   */
  buscarTurnosDisponibles(profesional: string): Observable<any[]> {
    const nowTimestamp = Timestamp.fromDate(moment().toDate());

    const usuarios = query(
      this.coleccionTurnos,
      where('profesional', '==', profesional),
      where('estado', '==', 'Disponible'),
      where('fecha', '>=', nowTimestamp),
      orderBy('fecha', 'desc')
    );

    return collectionData(usuarios) as Observable<any[]>;
  }

  /**
   * Trae todas las Turnos por fecha
   * @param fecha
   * @returns
   */
  traerTurnoPorFecha(fecha: Date) {
  const startOfDay = new Date(fecha);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(fecha);
  endOfDay.setHours(23, 59, 59, 999);

  const startTimestamp = Timestamp.fromDate(startOfDay);
  const endTimestamp = Timestamp.fromDate(endOfDay);

  const usuarios = query(
    this.coleccionTurnos,
    where('fecha', '>=', startTimestamp),
    where('fecha', '<=', endTimestamp),
    where('estado', '==', 'Disponible'),
  );

  return collectionData(usuarios) as Observable<any[]>;
  }

  async borrar(docRef: string): Promise<boolean> {
    try {
      const documentReference = doc(this.coleccionTurnos, docRef);

      deleteDoc(documentReference);

      return true;
    } catch (error) {
      return false;
    }
  }
}
