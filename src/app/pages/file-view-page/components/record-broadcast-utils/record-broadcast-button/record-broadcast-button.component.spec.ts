import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordBroadcastButtonComponent } from './record-broadcast-button.component';

describe('RecordBroadcastButtonComponent', () => {
  let component: RecordBroadcastButtonComponent;
  let fixture: ComponentFixture<RecordBroadcastButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordBroadcastButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordBroadcastButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
