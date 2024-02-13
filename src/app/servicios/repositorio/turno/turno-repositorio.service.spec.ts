import { TestBed } from '@angular/core/testing';

import { TurnoRepositorioService } from '../turno/turno-repositorio.service';

describe('TurnoRepositorioService', () => {
  let service: TurnoRepositorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnoRepositorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
