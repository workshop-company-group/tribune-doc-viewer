import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordControlsComponent } from './record-controls.component';

describe('RecordControlsComponent', () => {
  let component: RecordControlsComponent;
  let fixture: ComponentFixture<RecordControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
