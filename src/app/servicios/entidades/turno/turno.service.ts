import { Injectable } from '@angular/core';
import { TurnoRepositorioService } from '../../repositorio/turno/turno-repositorio.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { Turno } from 'src/app/interfaces/turno';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  
  listadoTurnosModelo?: Turno[];
  subscription?: Subscription;

  constructor(
    private turnosRepositorioService: TurnoRepositorioService,
    private db: AngularFirestore
  ) {
    if (!this.subscription) {
      this.subscription =
        this.turnosRepositorioService.listadoTurnos$.subscribe(
          (data) => {
            this.listadoTurnosModelo = data;
          }
        );
    }

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
        mensaje: 'Especialidad creada correctamente',
        valido: true,
      };
    } catch (err) {
      console.log(err);
      let errorMensaje = 'Hubo un error al intentar registrar la especialidad';
      if (err instanceof FirebaseError) {
        // if (err.code == 'auth/email-already-in-use') {
        //   errorMensaje = 'El email ingresado ya existe, ingrese otro';
        // }
      }
      return { mensaje: errorMensaje, valido: false };
    }
  }

  async TraerTodos() {
    return this.turnosRepositorioService.getAll();
  }

  async Modificar(docRef: string, turno: Turno) {
    return this.turnosRepositorioService.update(docRef, turno);
  }
}
