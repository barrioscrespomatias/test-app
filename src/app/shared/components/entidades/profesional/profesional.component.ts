import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profesional',
  standalone: true,
  imports: [],
  templateUrl: './profesional.component.html',
  styleUrl: './profesional.component.css'
})
export class ProfesionalComponent implements OnInit {
  @Input() path!:string;
  @Input() classSize!:string;
  @Input() profesional!:string;
  @Output() messageEvent = new EventEmitter<string>();

  constructor(){
    
  }

  ngOnInit(): void {
  }
}
