import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  constructor() { }

  //#region Metodos
  ConvertirFechaFirestore(fecha: any) {
    return new Date(fecha.seconds * 1000);
  }

  ConvertirFechaISO8601(fecha: any) {
    return new Date(fecha);
  }

  EsIgual(primeraFecha:Date, segundaFecha:Date){
    console.log("fecha 1 a comparar:" + primeraFecha.getTime())
    console.log("fecha 2 a comparar:" + segundaFecha.getTime())
    return primeraFecha.getTime() === segundaFecha.getTime();
  }
  //#endregion
}
