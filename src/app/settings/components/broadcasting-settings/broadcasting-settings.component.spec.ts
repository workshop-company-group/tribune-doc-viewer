import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastingSettingsComponent } from './broadcasting-settings.component';

describe('BroadcastingSettingsComponent', () => {
  let component: BroadcastingSettingsComponent;
  let fixture: ComponentFixture<BroadcastingSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastingSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
