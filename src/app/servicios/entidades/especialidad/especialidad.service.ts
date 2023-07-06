import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { EspecialidadRepositorioService } from '../../repositorio/especialidad/especialidad-repositorio.service';
import { FirebaseError } from '@angular/fire/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadService {
  //#region Propiedades
  listadoEspecialidadesModelo?: Especialidad[];
  subscription?: Subscription;
  //#endregion

  //#region Constructor
  constructor(
    private especialidadRepositorioService: EspecialidadRepositorioService,
    private db: AngularFirestore
  ) {
    // if (!this.subscription) {
    //   this.subscription =
    //     this.especialidadRepositorioService.listadoEspecialidades$.subscribe(
    //       (data) => {
    //         this.listadoEspecialidadesModelo = data;
    //       }
    //     );
    //     this.subscription.unsubscribe();
    // }

    // End constructor
  }
  //#endregion

  //#region Métodos
  async Crear(
    especialidadRegistro: Especialidad
  ): Promise<{ mensaje: string; valido: boolean }> {
    try {
      debugger
      let especialidadDocRef =
        this.especialidadRepositorioService.create(especialidadRegistro);

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
    return this.especialidadRepositorioService.getAll();
  }

  async TraerTodas() {
    return new Promise((resolve, reject) => {
      this.db
        .collection('especialidades')
        .valueChanges()
        .subscribe(
          (datos) => {
            resolve(datos);
          },
          (error) => reject(error)
        );
    });
  }
  //#endregion
}
