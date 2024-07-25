import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';

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

  DiaDeLaFecha(date: Date) {
    moment.locale('es');
    var dateJs =  this.ConvertirFechaFirestore(date);    
    const momentDate = moment(dateJs);    
    return momentDate.format('dddd');
  }

  EsIgual(primeraFecha:Date, segundaFecha:Date){
    return primeraFecha.getTime() === segundaFecha.getTime();
  }

  FechaFirestore(date: Date) {
    moment.locale('es');
    var dateJs =  this.ConvertirFechaFirestore(date);    
    const momentDate = moment(dateJs);    
    return momentDate.format('llll');
  }

  // InicioMesActual(){
  //   return moment().startOf('month').format('YYYY-MM-DD hh:mm');
  // }

  // FinMesActual(){
  //   return moment().endOf('month').format('YYYY-MM-DD hh:mm');
  // }

  InicioMesActual(){
    return moment().startOf('month').toDate();
  }

  FinMesActual(){
    return moment().endOf('month').toDate();
  }

  /**
 * Convierte un objeto Timestamp de Firestore a un objeto Date de JavaScript
 * @param timestamp
 * @returns {Date}
 */
 timestampToDate(timestamp: { seconds: number, nanoseconds: number }): Date {
  // Convertir segundos a milisegundos y crear un objeto moment
  const dateMoment = moment.unix(timestamp.seconds);
  
  // Convertir el objeto moment a un objeto Date de JavaScript
  return dateMoment.toDate();
}
  //#endregion
}