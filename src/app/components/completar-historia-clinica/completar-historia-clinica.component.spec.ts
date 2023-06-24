import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarHistoriaClinicaComponent } from './completar-historia-clinica.component';

describe('CompletarHistoriaClinicaComponent', () => {
  let component: CompletarHistoriaClinicaComponent;
  let fixture: ComponentFixture<CompletarHistoriaClinicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletarHistoriaClinicaComponent]
    });
    fixture = TestBed.createComponent(CompletarHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
