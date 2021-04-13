import { TestBed } from '@angular/core/testing';

import { ExternalViewerService } from './external-viewer.service';

describe('ExternalViewerService', () => {
  let service: ExternalViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
