import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  ngOnInit(): void {
    this.path = '../../assets/img/grillas/horario-turno.png';
  }

  sendMessage(mensaje: string) {
    this.messageEvent.emit(mensaje);
  }

  ConvertirFecha(fecha:any){
    return new Date(fecha.seconds * 1000);
  }
}
