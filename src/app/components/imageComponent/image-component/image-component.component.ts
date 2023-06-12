import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-component',
  templateUrl: './image-component.component.html',
  styleUrls: ['./image-component.component.css']
})
export class ImageComponentComponent implements OnInit{
 @Input() imageValue : any;
 @Input() atributeValue : any;
 @Output() onEnviarItemHaciaPadre = new EventEmitter<string>();

 ngOnInit(): void {
 }



enviarItemHaciaPadre(){
  this.onEnviarItemHaciaPadre.emit(this.atributeValue)
  }  
}
