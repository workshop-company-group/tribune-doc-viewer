import { TestBed } from '@angular/core/testing';

import { ApiOriginInterceptor } from './api-origin.interceptor';

describe('ApiOriginInterceptor', () => {
  let service: ApiOriginInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiOriginInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
