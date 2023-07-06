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
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioRepositorioService implements Repository<Usuario> {
  listadoUsuarios!: CollectionReference<DocumentData>;
  listadoUsuarios$!: Observable<Usuario[]>;

  constructor(private _firestore: Firestore) {
    this.listadoUsuarios = collection(this._firestore, 'usuarios');
    this.listadoUsuarios$ = collectionData(this.listadoUsuarios) as Observable<
      Usuario[]
    >;
  }
  getAll(): Observable<Usuario[]> {
    return this.listadoUsuarios$;
  }

  // create(entity: Usuario, userFirebaseAuthId: string): string {
  create(entity: Usuario, mail: string): string {
    if (this.listadoUsuarios) {
      // obtengo referencia al id del doucmento para asignarlo a un campo del usuario.
      let docRef: DocumentReference<DocumentData> = doc(this.listadoUsuarios,mail);
      const newItem: any = {
        ...entity,
        docRef: mail,
      };

      setDoc(docRef, newItem);
      return docRef.id;
    }
    return '';
  }
  update(docRef: string, ...args: unknown[]): boolean {
    debugger
    console.log(args
      )
    try {
      const documentReference = doc(this.listadoUsuarios, docRef);
      updateDoc(documentReference, {
        nombre: (args[0] as any).nombre,
        apellido: (args[0] as any).apellido,
        habilitado: (args[0] as any).habilitado,
        mail: (args[0] as any).mail,
        perfil: (args[0] as any).perfil,
        horarioEspecialidad: (args[0] as any).horarioEspecialidad,
        peso: (args[0] as any).peso,
        altura: (args[0] as any).altura,
      });
      console.log(args)
    } catch (e) {
      console.log(e);
    }
    console.log('supuestamente cambio')
    return false;
  }  

  delete(docRef: string): boolean {
    try {
      console.log(docRef);
      const documentReference = doc(this.listadoUsuarios, docRef);

      deleteDoc(documentReference);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
    // el guid que genera el doc
  }

  async getUsuarioByDocRefUserFirebaseAuth(userFirebaseAuthId: string) {
    try {
      let usuarios: Usuario[] = [];

      await new Promise<void>((resolve) => {
        let usuariosSub = this.listadoUsuarios$.subscribe((data) => {
          usuarios = data;
          usuariosSub.unsubscribe();
          resolve(); // Signal that the data is available
        });
      });

      let usuario: Usuario = usuarios!.find(
        (u) => u.userFirebaseAuthId == userFirebaseAuthId
      )!;

      return usuario.docRef;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
