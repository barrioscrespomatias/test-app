import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaProfesionalesComponent } from './grilla-profesionales.component';

describe('GrillaProfesionalesComponent', () => {
  let component: GrillaProfesionalesComponent;
  let fixture: ComponentFixture<GrillaProfesionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrillaProfesionalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrillaProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
