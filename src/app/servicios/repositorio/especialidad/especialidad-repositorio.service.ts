import { Injectable } from '@angular/core';
import { Repository } from 'src/app/data/common-repository.interface';
import { Observable } from 'rxjs';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Especialidad } from 'src/app/interfaces/especialidad';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadRepositorioService
  implements Repository<Especialidad>
{
  listadoEspecialidades!: CollectionReference<DocumentData>;
  listadoEspecialidades$!: Observable<Especialidad[]>;

  constructor(private _firestore: Firestore) {
    this.listadoEspecialidades = collection(this._firestore, 'especialidades');
    this.listadoEspecialidades$ = collectionData(
      this.listadoEspecialidades
    ) as Observable<Especialidad[]>;
  }
  getAll(): Observable<Especialidad[]> {
    return this.listadoEspecialidades$;
  }

  create(entity: Especialidad): string {
    if (this.listadoEspecialidades) {
      let docRef: DocumentReference<DocumentData> = doc(this.listadoEspecialidades);
      const newItem: Especialidad = {
        docRef: docRef.id,
        nombre: entity.nombre
      };

      setDoc(docRef, newItem);
      return docRef.id;
    }
    return "";
  }
  update(docRef: string, ...args: unknown[]): boolean {
    console.log(docRef);
    try {
      const documentReference = doc(this.listadoEspecialidades, docRef);

      updateDoc(documentReference, { estado: 'nuevo_estado' });
    } catch (e) {
      console.log(e);
    }
    return false;
  }
  delete(docRef: string): boolean {
    try {
      console.log(docRef);
      const documentReference = doc(this.listadoEspecialidades, docRef);

      deleteDoc(documentReference);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  } 
}
