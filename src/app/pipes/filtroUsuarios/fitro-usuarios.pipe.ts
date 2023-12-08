import { Pipe, PipeTransform } from '@angular/core';
import { SweetAlertService } from 'src/app/servicios/sweet-alert/sweet-alert.service';
import { Router } from '@angular/router';
import { reload } from 'firebase/auth';

@Pipe({
  name: 'filtroUsuarios',
})
export class FiltroUsuariosPipe implements PipeTransform {

  constructor(
    private sweetAlert: SweetAlertService,
    public router: Router,
  ) {}


  filtrados: any[] = [];

  transform(usuarios: any, especialidad: string): any[] {
    console.log(usuarios, especialidad)
    this.filtrados = [];
    if (usuarios != null) 
    {
      for (let item of usuarios) 
      {
        if (item.perfil == 'profesional' && item.especialidades.includes(especialidad)) 
        {          
          this.filtrados.push(item);
        }
      }
    }
    

    if(this.filtrados.length == 0 && usuarios != null){
      console.log(usuarios, especialidad)
      this.sweetAlert.MensajeError('No existen profesionales en la especialidad seleccionada')
      // this.router.navigate(['gestionUsuarios']);
      this.reloadCurrentRoute();
    }

    return this.filtrados;
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
