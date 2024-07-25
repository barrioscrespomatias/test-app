import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaEspecialidadesComponent } from './grilla-especialidades.component';

describe('GrillaEspecialidadesComponent', () => {
  let component: GrillaEspecialidadesComponent;
  let fixture: ComponentFixture<GrillaEspecialidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrillaEspecialidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrillaEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
