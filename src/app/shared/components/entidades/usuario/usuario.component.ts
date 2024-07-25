import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UsuarioComponent implements OnInit{

  @Input() path!:string;
  @Input() classSize!:string;
  @Input() user!:string;
  @Output() messageEvent = new EventEmitter<string>();

  constructor(){
    
  }

  ngOnInit(): void {
  }

}
