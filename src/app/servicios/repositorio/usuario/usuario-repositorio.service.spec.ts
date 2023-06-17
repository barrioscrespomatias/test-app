import { TestBed } from '@angular/core/testing';

import { UsuarioRepositorioService } from './usuario-repositorio.service';

describe('UsuarioRepositorioService', () => {
  let service: UsuarioRepositorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioRepositorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
