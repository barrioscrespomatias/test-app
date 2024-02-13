import { TestBed } from '@angular/core/testing';

import { LoginRepositorioService } from './login-repositorio.service';

describe('LoginRepositorioService', () => {
  let service: LoginRepositorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginRepositorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
