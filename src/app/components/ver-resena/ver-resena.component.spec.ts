import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerResenaComponent } from './ver-resena.component';

describe('VerResenaComponent', () => {
  let component: VerResenaComponent;
  let fixture: ComponentFixture<VerResenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerResenaComponent]
    });
    fixture = TestBed.createComponent(VerResenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
