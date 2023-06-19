import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaHorariosComponent } from './grilla-horarios.component';

describe('GrillaHorariosComponent', () => {
  let component: GrillaHorariosComponent;
  let fixture: ComponentFixture<GrillaHorariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrillaHorariosComponent]
    });
    fixture = TestBed.createComponent(GrillaHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
