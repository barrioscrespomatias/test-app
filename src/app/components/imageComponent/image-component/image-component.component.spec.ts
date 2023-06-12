import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageComponentComponent } from './image-component.component';

describe('ImageComponentComponent', () => {
  let component: ImageComponentComponent;
  let fixture: ComponentFixture<ImageComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageComponentComponent]
    });
    fixture = TestBed.createComponent(ImageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
