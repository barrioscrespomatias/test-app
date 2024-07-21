import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMostrarElement]',
  standalone: true
})
export class MostrarElementDirective {
  @Input('componentToggle') componentId!: string;
  constructor(private el: ElementRef) {
  }

  @HostListener('click') onClick() {
    const component = document.getElementById(this.componentId);
    if (component) {
      const components = document.querySelectorAll('[componentToggle]');
      components.forEach((comp) => {
        comp.classList.remove('active');
      });
      this.el.nativeElement.classList.add('active');
      const mainContainer = document.querySelector('.main-container');
      if (mainContainer) {
        mainContainer.childNodes.forEach((node: any) => {
          if (node.nodeType === 1 && node.tagName.toLowerCase().startsWith('app-')) {
            node.style.display = 'none';
          }
        });
        component.style.display = 'block';
      }
    }
  }
}
