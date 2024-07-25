import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioTurnoComponent } from './horario-turno.component';

describe('HorarioTurnoComponent', () => {
  let component: HorarioTurnoComponent;
  let fixture: ComponentFixture<HorarioTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioTurnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
