import { TestBed } from '@angular/core/testing';

import { UsuarioFirebaseService } from './usuario-firebase.service';

describe('UsuarioFirebaseService', () => {
  let service: UsuarioFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
