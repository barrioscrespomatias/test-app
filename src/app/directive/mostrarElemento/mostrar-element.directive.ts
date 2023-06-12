import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMostrarElement]',
})
export class MostrarElementDirective {
  constructor(private el: ElementRef) {
  }

  @HostListener('click') onClick() {
    let elements = this.el.nativeElement.childNodes;
    elements.forEach((element: HTMLElement) => {    
      element.style.display = 'block';
    });
  }
}
