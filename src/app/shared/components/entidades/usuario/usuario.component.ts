import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UsuarioComponent implements OnInit{

  @Input() path!:string;
  @Input() classSize!:string;
  @Input() user!:string;
  @Output() messageEvent = new EventEmitter<string>();
  width:string = '';

  constructor(){
 
  }

  ngOnInit(): void {
    if(this.classSize != undefined && this.classSize.length >0 ){
      // medium:string = 'round-image-medium';
      // small:string ='round-image-small';
      // large:string ='round-image-large';
      if(this.classSize == 'round-image-medium')
        this.width = 'medium';
      else if(this.classSize == 'round-image-small')
        this.width = 'small';
      else
        this.width = 'large';

    }
  }

}
