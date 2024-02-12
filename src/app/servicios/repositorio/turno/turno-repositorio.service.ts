import { Injectable } from '@angular/core';
import { Repository } from 'src/app/data/common-repository.interface';
import { Observable } from 'rxjs';
import { startOfDay, endOfDay } from 'date-fns';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  Timestamp,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Turno } from 'src/app/interfaces/turno';

@Injectable({
  providedIn: 'root',
})
export class TurnoRepositorioService implements Repository<Turno> {
  listadoTurnos!: CollectionReference<DocumentData>;
  listadoTurnos$!: Observable<Turno[]>;

  constructor(private _firestore: Firestore) {
    this.listadoTurnos = collection(this._firestore, 'turnos');
    const queryOrdenada = query(this.listadoTurnos, orderBy('fecha', 'desc'));
    this.listadoTurnos$ = collectionData(queryOrdenada) as Observable<Turno[]>;
  }
  getAll(): Observable<Turno[]> {
    return this.listadoTurnos$;
  }

  create(entity: Turno): string {
    if (this.listadoTurnos) {
      // obtengo referencia al id del doucmento para asignarlo a un campo del usuario.
      let docRef: DocumentReference<DocumentData> = doc(this.listadoTurnos);
      const newItem: any = {
        ...entity,
        docRef: docRef.id,
      };

      setDoc(docRef, newItem);
      return docRef.id;
    }
    return '';
  }
  update(docRef: string, ...args: unknown[]): boolean {
    console.log(args);
    try {
      const documentReference = doc(this.listadoTurnos, docRef);
      updateDoc(documentReference, {
        fecha: (args[0] as any).fecha,
        especialidad: (args[0] as any).especialidad,
        paciente: (args[0] as any).paciente,
        pacienteNombre: (args[0] as any).pacienteNombre,
        pacienteApellido: (args[0] as any).pacienteApellido,
        pacienteImagen: (args[0] as any).pacienteImagen,
        profesional: (args[0] as any).profesional,
        estado: (args[0] as any).estado,
        rating: (args[0] as any).rating,
        encuesta: (args[0] as any).encuesta,
        resena: (args[0] as any).resena,
        diagnostico: (args[0] as any).diagnostico,
        historia_clinica: (args[0] as any).historia_clinica,
        altura: (args[0] as any).altura,
        peso: (args[0] as any).peso,
        temperatura: (args[0] as any).temperatura,
        presion: (args[0] as any).presion,
      });
      console.log(args);
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  delete(docRef: string): boolean {
    try {
      const documentReference = doc(this.listadoTurnos, docRef);

      deleteDoc(documentReference);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
   * Busca en la entidad segun un parametro enviado
   * @param clave
   * @param valor
   * @returns
   */
  Buscar(clave: string, valor: string): Observable<Turno[]> {
    const coleccion = collection(this._firestore, 'turnos');
    const consulta = query(coleccion, where(clave, '==', valor));
    const result = collectionData(consulta) as Observable<Turno[]>;
    return result;
  }

  TurnosIniciados(): Observable<Turno[]> {
    const coleccion = collection(this._firestore, 'turnos');
    const consulta = query(
      coleccion,
      where('estado', 'in', [
        'Pendiente de aprobacion',
        'Cancelado',
        'Rechazado',
        'Aceptado',
        'Realizado',
      ]),

      orderBy('fecha', 'desc')
    );
    const result = collectionData(consulta) as Observable<Turno[]>;
    return result;
  }

  /**
   * Obtener los turnos realizados por el profesional
   * @param profesional
   * @returns
   */
  TurnosRealizadosProfesional(profesional: string): Observable<Turno[]> {
    const coleccion = collection(this._firestore, 'turnos');
    const consulta = query(
      coleccion,
      where('profesional', '==', profesional),
      where('estado', '==', 'Realizado'),
      orderBy('fecha', 'desc')
    );
    const result = collectionData(consulta) as Observable<Turno[]>;
    return result;
  }

  /**
   * Obtener los turnos solicitados de los profesionales.
   * @param desde
   * @param hasta
   * @returns
   */
  TurnosSolicitadosRangoFechas(desde: any, hasta: any): Observable<Turno[]> {
    const desdeInicioDia = startOfDay(desde); // Desde las 00:00:00
    const hastaFinDia = endOfDay(hasta); // Hasta las 23:59:59
  
    const desdeTimestamp = Timestamp.fromDate(desdeInicioDia);
    const hastaTimestamp = Timestamp.fromDate(hastaFinDia);

    const coleccion = collection(this._firestore, 'turnos');
    const consulta = query(
      coleccion,
      where('fecha', '>=', desdeTimestamp),
      where('fecha', '<=', hastaTimestamp),
      where('estado', 'in', [
        'Pendiente de aprobacion',
        'Cancelado',
        'Rechazado',
        'Aceptado',
        'Realizado',
      ]),
      orderBy('fecha', 'desc')
    );
    const result = collectionData(consulta) as Observable<Turno[]>;
    return result;
  }

    /**
   * Obtener los turnos finalizados de los profesionales.
   * @param desde
   * @param hasta
   * @returns
   */
    TurnosFinalizadosRangoFechas(desde: any, hasta: any): Observable<Turno[]> {
      const desdeInicioDia = startOfDay(desde); // Desde las 00:00:00
      const hastaFinDia = endOfDay(hasta); // Hasta las 23:59:59
    
      const desdeTimestamp = Timestamp.fromDate(desdeInicioDia);
      const hastaTimestamp = Timestamp.fromDate(hastaFinDia);
  
      const coleccion = collection(this._firestore, 'turnos');
      const consulta = query(
        coleccion,
        where('fecha', '>=', desdeTimestamp),
        where('fecha', '<=', hastaTimestamp),
        where('estado', 'in', [
          'Realizado'
        ]),
        orderBy('fecha', 'desc')
      );
      const result = collectionData(consulta) as Observable<Turno[]>;
      return result;
    }

    TurnosPorDia(): Observable<Turno[]> {
  
      const coleccion = collection(this._firestore, 'turnos');
      const consulta = query(
        coleccion,
        orderBy('estado'), // Ordenar por 'estado' primero
        where('estado', '!=', 'Disponible'), // Filtrar por 'estado' distinto de 'Disponible'
        orderBy('fecha', 'desc') // Luego ordenar por 'fecha'
      );
      const result = collectionData(consulta) as Observable<Turno[]>;
      return result;
    }
}
