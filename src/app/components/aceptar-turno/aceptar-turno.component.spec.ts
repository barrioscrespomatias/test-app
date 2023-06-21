import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarTurnoComponent } from './aceptar-turno.component';

describe('AceptarTurnoComponent', () => {
  let component: AceptarTurnoComponent;
  let fixture: ComponentFixture<AceptarTurnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AceptarTurnoComponent]
    });
    fixture = TestBed.createComponent(AceptarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
