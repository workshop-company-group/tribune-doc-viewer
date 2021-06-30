import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSettingsSectionComponent } from './password-settings-section.component';

describe('PasswordSettingsSectionComponent', () => {
  let component: PasswordSettingsSectionComponent;
  let fixture: ComponentFixture<PasswordSettingsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordSettingsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordSettingsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
