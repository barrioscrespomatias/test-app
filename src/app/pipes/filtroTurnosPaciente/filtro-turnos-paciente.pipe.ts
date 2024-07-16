import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroTurnosPaciente',
  standalone: true
})
export class FiltroTurnosPacientePipe implements PipeTransform {
  filtrados: any[] = [];
  filtradosConPacienteSeleccionado: any[] = [];
  filtradosConProfesionalSeleccionado: any[] = [];
  filtradosConAtributoAlturaSeleccionado: any[] = [];
  filtradosConAtributoPesoSeleccionado: any[] = [];
  filtradosConAtributoTemperaturaSeleccionado: any[] = [];
  filtradosConAtributoPresionSeleccionado: any[] = [];
  filtradosConEstadoSeleccionado: any[] = [];
  filtradosConFechaSeleccionadaSeleccionado: any[] = [];

  datePipe: DatePipe;

  constructor() {
    this.datePipe = new DatePipe('en-US');
  }

  transform(turnos: any,
            paciente: string,
            profesional: string,

            especialidadSeleccionadaParaFiltrar:string,
            profesionalSeleccionadoParaFiltrar:string,
            atributoAlturaSeleccionadoParaFiltrar:number,
            atributoPesoSeleccionadoParaFiltrar:number,
            atributoTemperaturaSeleccionadoParaFiltrar:number,
            atributoPresionSeleccionadoParaFiltrar:string,
            fechaSeleccionadaParaFiltrar:string,
            estadoSeleccionadoParaFiltrar:number,
            estado: string, estado_igual : boolean,
  ): any[] {

    this.filtrados = [];
    this.filtradosConPacienteSeleccionado = [];
    this.filtradosConProfesionalSeleccionado = [];
    this.filtradosConAtributoAlturaSeleccionado = [];
    this.filtradosConAtributoPesoSeleccionado = [];
    this.filtradosConAtributoTemperaturaSeleccionado = [];
    this.filtradosConAtributoPresionSeleccionado = [];
    this.filtradosConEstadoSeleccionado = [];
    this.filtradosConFechaSeleccionadaSeleccionado = [];
    if (turnos != null) 
    {
      for (let item of turnos) 
        {
          //#region Paciente y profesional
          if (paciente.length > 0 && profesional.length > 0) 
          {
            if(estado_igual)
            {
              if (item.paciente == paciente && item.profesional == profesional && item.estado == estado) 
              {
                
                this.filtrados.push(item);
              }
            }
            else
            {
              if (item.paciente == paciente && item.profesional == profesional && item.estado != estado) 
              {
                this.filtrados.push(item);
              }
            }          
          }
          //#endregion

          //#region No paciente, no profesional
          else if(profesional.length == 0 && paciente.length == 0) 
          {
            if(estado_igual)
            {
              if (item.estado == estado) 
              {
                this.filtrados.push(item);
              }
            }
            else
            {
              if (item.estado != estado) 
              {
                this.filtrados.push(item);
              }
            }          
          }
          //#endregion

          //#region Solo Paciente
          else if (paciente.length > 0) 
          {
            if(estado_igual)
            {
              if (item.paciente == paciente && item.estado == estado) 
              {
                this.filtrados.push(item);
              }
            }
            else
            {
              if (item.paciente == paciente && item.estado != estado) 
              {
                this.filtrados.push(item);
              }
            }          
          } 
          //#endregion

          //#region Solo Profesional
          else if (profesional.length > 0) 
          {
            
            if(estado_igual)
            {
              if (item.profesional == profesional && item.estado == estado) 
              {
                this.filtrados.push(item);
              }
            }
            else
            {
              if (item.profesional == profesional && item.estado != estado) 
              {
                this.filtrados.push(item);
              }
            }          
          }
          //#endregion
        }
      }



    if(especialidadSeleccionadaParaFiltrar.length > 0)
    {
      for (let item of this.filtrados) 
      {
        if (item.especialidad == especialidadSeleccionadaParaFiltrar) 
        {
          this.filtradosConPacienteSeleccionado.push(item);
        }
      }
    }

    if(profesionalSeleccionadoParaFiltrar.length > 0)
    {
      for (let item of this.filtrados) 
      {
        if (item.profesional == profesionalSeleccionadoParaFiltrar) 
        {
          this.filtradosConProfesionalSeleccionado.push(item);
        }
      }
    }

    if(estadoSeleccionadoParaFiltrar != -1)
    {
      for (let item of this.filtrados) 
      {     
        if (item.estado == estadoSeleccionadoParaFiltrar) 
        {
          this.filtradosConEstadoSeleccionado.push(item);
        }
      }
    }


    if(fechaSeleccionadaParaFiltrar != '')
    {
      for (let item of this.filtrados) 
      {     
        if(this.MismaFecha(item.fecha,fechaSeleccionadaParaFiltrar))
        if (this.MismaFecha(item.fecha,fechaSeleccionadaParaFiltrar)) 
        {
          this.filtradosConFechaSeleccionadaSeleccionado.push(item);
        }
      }
    }

    if(atributoAlturaSeleccionadoParaFiltrar != 0)
    {
      for (let item of this.filtrados) 
      {
        if (item.altura == atributoAlturaSeleccionadoParaFiltrar) 
        {
          this.filtradosConAtributoAlturaSeleccionado.push(item);
        }
      }
    }

    if(atributoPesoSeleccionadoParaFiltrar != 0)
    {
      for (let item of this.filtrados) 
      {     
        if (item.peso == atributoPesoSeleccionadoParaFiltrar) 
        {
          this.filtradosConAtributoPesoSeleccionado.push(item);
        }
      }
    }

    if(atributoTemperaturaSeleccionadoParaFiltrar != 0)
    {
      for (let item of this.filtrados) 
      {     
        if (item.temperatura == atributoTemperaturaSeleccionadoParaFiltrar) 
        {
          this.filtradosConAtributoTemperaturaSeleccionado.push(item);
        }
      }
    }

    if(atributoPresionSeleccionadoParaFiltrar.length > 0)
    {
      for (let item of this.filtrados) 
      {
        if (item.presion == atributoPresionSeleccionadoParaFiltrar) 
        {
          this.filtradosConAtributoPresionSeleccionado.push(item);
        }
      }
    }
    
    if(especialidadSeleccionadaParaFiltrar.length > 0)
      return this.filtradosConPacienteSeleccionado;
    else if(profesionalSeleccionadoParaFiltrar.length > 0)
      return this.filtradosConProfesionalSeleccionado;
    else if(atributoAlturaSeleccionadoParaFiltrar != 0)
      return this.filtradosConAtributoAlturaSeleccionado;
    else if(atributoPesoSeleccionadoParaFiltrar != 0)
      return this.filtradosConAtributoPesoSeleccionado;
    else if(atributoTemperaturaSeleccionadoParaFiltrar != 0)
      return this.filtradosConAtributoTemperaturaSeleccionado;
    else if(atributoPresionSeleccionadoParaFiltrar.length > 0)
      return this.filtradosConAtributoPresionSeleccionado;
    else if(estadoSeleccionadoParaFiltrar != -1)
      return this.filtradosConEstadoSeleccionado;
    else if(fechaSeleccionadaParaFiltrar != '')
      return this.filtradosConFechaSeleccionadaSeleccionado;
    else
      return this.filtrados;
  }

  MismaFecha(date1: any, date2: any): boolean {
    const formattedDate1 = this.FormatoFecha(date1);
    const formattedDate2 = this.FormatoFecha(date2);
    return formattedDate1.slice(0, 10) === formattedDate2.slice(0, 10);
  }

  FormatoFecha(fecha: any): string {
    const date = fecha ? new Date(fecha.seconds * 1000) : null;
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss') ?? '';
  }
}
