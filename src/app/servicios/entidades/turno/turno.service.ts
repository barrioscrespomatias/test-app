import { Injectable } from '@angular/core';
import { Turno } from 'src/app/interfaces/turno';

import {
} from '@angular/fire/firestore';
import { TurnoRepositorioService } from '../../repositorio/turno/turno-repositorio.service';

@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  constructor(
    private turnosRepositorioService: TurnoRepositorioService
  ) {}
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

  async TurnosIniciados() {
    return this.turnosRepositorioService.TurnosIniciados();
  }

  async TurnosSolicitadosRangoFechas (desde:any, hasta:any) {
    return this.turnosRepositorioService.TurnosSolicitadosRangoFechas(desde,hasta);
  }

  async TurnosFinalizadosRangoFechas (desde:any, hasta:any) {
    return this.turnosRepositorioService.TurnosFinalizadosRangoFechas(desde,hasta);
  }

  async TurnosPorDia () {
    return this.turnosRepositorioService.TurnosPorDia();
  }

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

  async Buscar(clave: string, valor: string) {
    return this.turnosRepositorioService.Buscar(clave, valor);
  }

  async TurnosRealizadosProfesional(profesional: string) {
    return this.turnosRepositorioService.TurnosRealizadosProfesional(profesional);
  }
}