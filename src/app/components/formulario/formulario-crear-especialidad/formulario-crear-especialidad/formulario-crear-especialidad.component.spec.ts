import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCrearEspecialidadComponent } from './formulario-crear-especialidad.component';

describe('FormularioCrearEspecialidadComponent', () => {
  let component: FormularioCrearEspecialidadComponent;
  let fixture: ComponentFixture<FormularioCrearEspecialidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioCrearEspecialidadComponent]
    });
    fixture = TestBed.createComponent(FormularioCrearEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
