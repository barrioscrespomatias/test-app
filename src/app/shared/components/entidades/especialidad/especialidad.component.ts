import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavComponent } from 'src/app/components/nav/nav/nav.component';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.css'
})
export class EspecialidadComponent {
  @Input() path!:string;
  @Input() classSize!:string;
  @Input() especialidad!:string;
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage(mensaje: string) {
    this.messageEvent.emit(mensaje);
  }

}
