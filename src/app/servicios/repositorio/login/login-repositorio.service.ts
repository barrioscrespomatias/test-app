import { Injectable } from '@angular/core';
import { Repository } from 'src/app/data/common-repository.interface';
import { Observable } from 'rxjs';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collectionData,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Login } from 'src/app/interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class LoginRepositorioService implements Repository<Login> {
  listadoLogins!: CollectionReference<DocumentData>;
  listadoLogins$!: Observable<Login[]>;

  constructor(private _firestore: Firestore) {
    this.listadoLogins = collection(this._firestore, 'logins');
    const queryOrdenada = query(this.listadoLogins, orderBy('date', 'desc'));
    this.listadoLogins$ = collectionData(queryOrdenada) as Observable<Login[]>;
  }
  getAll(): Observable<Login[]> {
    return this.listadoLogins$;
  }

  /**
   * Obtener los logins del usuario
   * @param email
   * @returns
   */
    LoginsPorUsuario(email: string): Observable<Login[]> {
      const coleccion = collection(this._firestore, 'logins');
      const consulta = query(
        coleccion,
        where('email', '==', email),
        orderBy('date', 'desc')
      );
      const result = collectionData(consulta) as Observable<Login[]>;
      return result;
    }

    create(entity: Login): string {
    throw new Error('not implemented');
  }

  update(docRef: string, ...args: unknown[]): boolean {
    throw new Error('not implemented');
  }

  delete(docRef: string): boolean {
    throw new Error('not implemented');
  }
}