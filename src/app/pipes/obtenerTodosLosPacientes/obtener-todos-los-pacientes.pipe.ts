import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obtenerTodosLosPacientes',
  standalone:true
})
export class ObtenerTodosLosPacientesPipe implements PipeTransform {

  filtrados: any[] = [];

  transform(usuarios: any, perfil:string): any[] {
    this.filtrados = [];
    if (usuarios != null) 
    {
      for (let item of usuarios) 
      {
        if (item.nombre != '' && item.nombre != '' && item.mail != '' && item.perfil == perfil && !this.filtrados.includes(item.mail)) 
        {    
          this.filtrados.push(item.mail);
        }
      }
    }

    return this.filtrados;
  }

}
