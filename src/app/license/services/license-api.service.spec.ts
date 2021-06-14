import { TestBed } from '@angular/core/testing';

import { LicenseApiService } from './license-api.service';

describe('LicenseApiService', () => {
  let service: LicenseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenseApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
