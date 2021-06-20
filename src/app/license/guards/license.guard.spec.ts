import { TestBed } from '@angular/core/testing';

import { LicenseGuard } from './license.guard';

describe('LicenseGuard', () => {
  let guard: LicenseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LicenseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
