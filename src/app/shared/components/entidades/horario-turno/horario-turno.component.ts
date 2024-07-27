import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-horario-turno',
  standalone: true,
  imports: [],
  templateUrl: './horario-turno.component.html',
  styleUrl: './horario-turno.component.css'
})
export class HorarioTurnoComponent {
  @Input() path!:string;
  @Input() classSize!:string;
  @Input() fecha!:Date;
  @Output() messageEvent = new EventEmitter<string>();

  // path:string='';

  constructor(){
    moment.locale('es');
  }

  ngOnInit(): void {
    this.path = '../../assets/img/grillas/horario-turno.png';
  }

  sendMessage(mensaje: string) {
    this.messageEvent.emit(mensaje);
  }

  GetFormattedDate(fecha: any): string {
    const date = fecha ? new Date(fecha.seconds * 1000) : null;

    const momentDate = moment(date);
    if (momentDate.isValid()) {
      return momentDate.format('h:mm A');
    }
    return 'Hora inválida';
  }
}
