import { Injectable } from '@angular/core';
import SweetAlert from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  baseUrl = window.location.origin;
  imagePath = '/assets/img/marquito.gif';
  gifPath = '/assets/img/unicornio.gif';

  //#region Metodos
  MensajeError(mensaje: string) {
    SweetAlert.fire({
      icon: 'error',
      title: 'Ooops...',
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

  MensajeExitoImage(){
    SweetAlert.fire({
      title: 'Muy bien jugado!!',
      width: 480,
      padding: '3em',
      color: '#716add',
      background: `#fff url(${this.baseUrl}${this.imagePath})`,
      backdrop: `
        rgba(0,0,123,0.4)
        url("${this.baseUrl}${this.gifPath}")
        center top
        no-repeat
      `
    });
  }
  //#endregion
}
