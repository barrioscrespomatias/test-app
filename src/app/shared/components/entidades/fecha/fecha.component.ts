import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-fecha',
  standalone: true,
  imports: [],
  templateUrl: './fecha.component.html',
  styleUrl: './fecha.component.css'
})
export class FechaComponent implements OnInit{
  // @Input() path!:string;
  @Input() classSize!:string;
  @Input() fecha!:Date;
  @Output() messageEvent = new EventEmitter<string>();

  momentFecha:any;

  path:string='';

  constructor(){
    moment.locale('es');
  }

  ngOnInit(): void {
    this.path = '../../assets/img/grillas/fecha.png';
  }

  sendMessage(mensaje: string) {
    this.messageEvent.emit(mensaje);
  }

  GetFormattedDate(fecha: any): string {
    const date = fecha ? new Date(fecha.seconds * 1000) : null;

    return moment(date).format('D [de] MMMM');
  }
}
