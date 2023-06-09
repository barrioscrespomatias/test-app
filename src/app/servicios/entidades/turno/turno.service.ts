import { Injectable } from '@angular/core';
import { TurnoRepositorioService } from '../../repositorio/turno/turno-repositorio.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { Turno } from 'src/app/interfaces/turno';
import { FirebaseError } from 'firebase/app';

import {
  Firestore,
  collection,
  collectionData,
  doc,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  listadoTurnosModelo?: Turno[];
  subscription?: Subscription;

  constructor(
    private turnosRepositorioService: TurnoRepositorioService,
    private db: AngularFirestore,
    private firestore: Firestore,
  ) {
    // if (!this.subscription) {
    //   this.subscription =
    //     this.turnosRepositorioService.listadoTurnos$.subscribe((data) => {
    //       this.listadoTurnosModelo = data;
    //     });
    // }

    // End constructor
  }
  //#endregion

  //#region Métodos
  async Crear(
    especialidadRegistro: Turno
  ): Promise<{ mensaje: string; valido: boolean }> {
    try {
      let especialidadDocRef =
        this.turnosRepositorioService.create(especialidadRegistro);

      return {
        mensaje: 'Turnos asignados correctamente',
        valido: true,
      };
    } catch (err) {
      console.log(err);
      let errorMensaje = 'Hubo un error al intentar generar los turnos';
      return { mensaje: errorMensaje, valido: false };
    }
  }

  async TraerTodos() {
    return this.turnosRepositorioService.getAll();
  }


  // async TraerTodos() {
  //   const coleccion = collection(this.firestore, 'turnos');
  //   return collectionData(coleccion);
  // }

  async Modificar(docRef: string, turno: Turno): Promise<{ mensaje: string; valido: boolean }> 
  {
    try {
      this.turnosRepositorioService.update(docRef, turno);

      return {
        mensaje: 'Turnos modificados correctamente',
        valido: true,
      };
    } catch (err) {
      console.log(err);
      let errorMensaje = 'Hubo un error al intentar modificar los turnos';
      return { mensaje: errorMensaje, valido: false };
    }
  }

  // async Modificar(docRef: string, turno: Turno) {
  //   return this.turnosRepositorioService.update(docRef, turno);
  // }
}
