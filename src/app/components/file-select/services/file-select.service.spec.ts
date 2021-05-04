import { TestBed } from '@angular/core/testing';

import { FileSelectService } from './file-select.service';

describe('FileSelectService', () => {
  let service: FileSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
