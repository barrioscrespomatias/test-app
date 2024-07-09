import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTablePaginatorComponent } from './material-table-paginator.component';

describe('MaterialTablePaginatorComponent', () => {
  let component: MaterialTablePaginatorComponent;
  let fixture: ComponentFixture<MaterialTablePaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialTablePaginatorComponent]
    });
    fixture = TestBed.createComponent(MaterialTablePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
