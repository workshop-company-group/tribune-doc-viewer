import { TestBed } from '@angular/core/testing';

import { LicenseResolver } from './license.resolver';

describe('LicenseResolver', () => {
  let service: LicenseResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenseResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
