import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingSettingsComponent } from './recording-settings.component';

describe('RecordingSettingsComponent', () => {
  let component: RecordingSettingsComponent;
  let fixture: ComponentFixture<RecordingSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordingSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
