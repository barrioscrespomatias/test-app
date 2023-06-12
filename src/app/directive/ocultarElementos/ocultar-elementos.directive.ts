import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOcultarElementos]'
})
export class OcultarElementosDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('click') onClick() {
    let elements = this.el.nativeElement.childNodes;
    elements.forEach((element: HTMLElement) => {    
      element.style.display = 'none';
    });
  }

}
