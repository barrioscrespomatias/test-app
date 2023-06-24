import { Injectable } from '@angular/core';
import SweetAlert from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  //#region Metodos
  MensajeError(mensaje: string) {
    SweetAlert.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
    });
  }

  MensajeWarning(mensaje: string) {
    SweetAlert.fire({
      icon: 'warning',
      title: 'Atencion!',
      text: mensaje,
    });
  }

  MensajeExitoso(mensaje: string) {
    SweetAlert.fire({
      position: 'center',
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  //#endregion
}
