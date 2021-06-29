import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordBroadcastControlComponent } from './record-broadcast-control.component';

describe('RecordBroadcastControlComponent', () => {
  let component: RecordBroadcastControlComponent;
  let fixture: ComponentFixture<RecordBroadcastControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordBroadcastControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordBroadcastControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
