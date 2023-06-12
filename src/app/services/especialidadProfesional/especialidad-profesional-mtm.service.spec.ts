import { TestBed } from '@angular/core/testing';

import { EspecialidadProfesionalMtmService } from './especialidad-profesional-mtm.service';

describe('EspecialidadProfesionalMtmService', () => {
  let service: EspecialidadProfesionalMtmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecialidadProfesionalMtmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
