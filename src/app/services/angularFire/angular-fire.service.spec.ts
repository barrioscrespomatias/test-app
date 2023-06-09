import { TestBed } from '@angular/core/testing';

import { FirebaseAuthService } from './angular-fire.service';

describe('AngularFireService', () => {
  let service: FirebaseAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
