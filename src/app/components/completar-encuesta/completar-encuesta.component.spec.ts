import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarEncuestaComponent } from './completar-encuesta.component';

describe('CompletarEncuestaComponent', () => {
  let component: CompletarEncuestaComponent;
  let fixture: ComponentFixture<CompletarEncuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletarEncuestaComponent]
    });
    fixture = TestBed.createComponent(CompletarEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
