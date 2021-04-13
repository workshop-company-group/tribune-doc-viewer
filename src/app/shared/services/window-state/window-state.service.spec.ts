import { TestBed } from '@angular/core/testing';

import { WindowStateService } from './window-state.service';

describe('WindowStateService', () => {
  let service: WindowStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
