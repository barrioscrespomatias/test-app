import { TestBed } from '@angular/core/testing';

import { EspecialidadRepositorioService } from './especialidad-repositorio.service';

describe('EspecialidadRepositorioService', () => {
  let service: EspecialidadRepositorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecialidadRepositorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
