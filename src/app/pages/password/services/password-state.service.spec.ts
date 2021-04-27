import { TestBed } from '@angular/core/testing';

import { PasswordStateService } from './password-state.service';

describe('PasswordStateService', () => {
  let service: PasswordStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
