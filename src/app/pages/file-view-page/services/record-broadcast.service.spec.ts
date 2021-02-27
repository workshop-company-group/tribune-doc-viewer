import { TestBed } from '@angular/core/testing';

import { RecordBroadcastService } from './record-broadcast.service';

describe('RecordBroadcastService', () => {
  let service: RecordBroadcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordBroadcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
