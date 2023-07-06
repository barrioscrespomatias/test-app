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
import { Turno } from 'src/app/interfaces/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoRepositorioService implements Repository<Turno> {

  listadoTurnos!: CollectionReference<DocumentData>;
  listadoTurnos$!: Observable<Turno[]>;

  constructor(private _firestore: Firestore) {
    this.listadoTurnos = collection(this._firestore, 'turnos');
    this.listadoTurnos$ = collectionData(this.listadoTurnos) as Observable<Turno[]>;
  }
  getAll(): Observable<Turno[]> {
    return this.listadoTurnos$;
  }

  // create(entity: Usuario, userFirebaseAuthId: string): string {
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
    try {
      const documentReference = doc(this.listadoTurnos, docRef);
      updateDoc(documentReference, {
        fecha: (args[0] as any).fecha,        
        especialidad: (args[0] as any).especialidad,        
        paciente: (args[0] as any).paciente,        
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
      console.log(args)
    } catch (e) {
      console.log(e);
    }
    return false;
  }  

  delete(docRef: string): boolean {
    try {
      console.log(docRef);
      const documentReference = doc(this.listadoTurnos, docRef);

      deleteDoc(documentReference);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
    // el guid que genera el doc
  }

  // async getUsuarioByDocRefUserFirebaseAuth(userFirebaseAuthId: string) {
  //   try {
  //     let usuarios: Turno[] = [];

  //     await new Promise<void>((resolve) => {
  //       let usuariosSub = this.listadoTurnos$.subscribe((data) => {
  //         usuarios = data;
  //         usuariosSub.unsubscribe();
  //         resolve(); // Signal that the data is available
  //       });
  //     });

  //     let usuario: Turno = usuarios!.find(
  //       (u) => u.userFirebaseAuthId == userFirebaseAuthId
  //     )!;

  //     return usuario.docRefUsuarioId;
  //   } catch (error) {
  //     console.log(error);
  //     return;
  //   }
  // }
}
