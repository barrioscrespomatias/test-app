import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { EspecialidadRepositorioService } from '../../repositorio/especialidad/especialidad-repositorio.service';
import { FirebaseError } from '@angular/fire/app';

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
    private especialidadRepositorioService: EspecialidadRepositorioService
  ) {
    if (!this.subscription) {
      this.subscription =
        this.especialidadRepositorioService.listadoEspecialidades$.subscribe(
          (data) => {
            this.listadoEspecialidadesModelo = data;
          }
        );
    }

    // End constructor
  }
  //#endregion

  //#region Métodos
  async Crear(
    especialidadRegistro: Especialidad
  ): Promise<{ mensaje: string; valido: boolean }> {
    try {
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
  //#endregion
}
