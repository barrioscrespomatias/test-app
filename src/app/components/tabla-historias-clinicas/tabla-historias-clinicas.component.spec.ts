import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaHistoriasClinicasComponent } from './tabla-historias-clinicas.component';

describe('TablaHistoriasClinicasComponent', () => {
  let component: TablaHistoriasClinicasComponent;
  let fixture: ComponentFixture<TablaHistoriasClinicasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaHistoriasClinicasComponent]
    });
    fixture = TestBed.createComponent(TablaHistoriasClinicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
