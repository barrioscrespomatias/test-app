import SweetAlert from 'sweetalert2';

export class Swal {
  Confirmar() {
    SweetAlert.fire({
      title: 'Are you sure?',
      text: 'You will not be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked the confirm button
      } else if (result.isDenied) {
        // User clicked the cancel button
      }
    });
  }

  SwalMensajeError(title: string, text: string) {
    SweetAlert.fire({
      icon: 'error',
      title: title,
      text: text,
    });
  }

  SwalMensajeExitoso(text: string) {
    SweetAlert.fire({
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  SwalMensajeGenerico(title: string, text: string) {
    SweetAlert.fire(title, text, 'success');
  }
}
