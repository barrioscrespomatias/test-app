import {
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  ComponentFactoryResolver,
  ElementRef,
  Output,
  HostListener,
} from '@angular/core';
import { RegistroComponent } from '../../modules/registro/registro.component';

@Directive({
  selector: '[appObtenerValor]',
})
export class ObtenerValorDirective {
  constructor(
    private el: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @Input() appObtenerValor = '';
  @Output() valorCrearProfesional = '';

  @HostListener('click') onClick() {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(RegistroComponent);
    const componentRef =
      this.viewContainerRef.createComponent(componentFactory);
    const myComponentInstance = componentRef.instance;  

    myComponentInstance.valueFromDirective = this.appObtenerValor;

     // aca se ve el valor.
  }
}
