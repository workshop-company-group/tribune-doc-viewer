import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseKeyInputComponent } from './license-key-input.component';

describe('LicenseKeyInputComponent', () => {
  let component: LicenseKeyInputComponent;
  let fixture: ComponentFixture<LicenseKeyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseKeyInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseKeyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
