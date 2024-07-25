import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaHorariosTurnosComponent } from './grilla-horarios-turnos.component';

describe('GrillaHorariosTurnosComponent', () => {
  let component: GrillaHorariosTurnosComponent;
  let fixture: ComponentFixture<GrillaHorariosTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrillaHorariosTurnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrillaHorariosTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
