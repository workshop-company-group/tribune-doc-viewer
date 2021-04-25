import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishRecordConfirmationComponent } from './finish-record-confirmation.component';

describe('FinishRecordConfirmationComponent', () => {
  let component: FinishRecordConfirmationComponent;
  let fixture: ComponentFixture<FinishRecordConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishRecordConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishRecordConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
