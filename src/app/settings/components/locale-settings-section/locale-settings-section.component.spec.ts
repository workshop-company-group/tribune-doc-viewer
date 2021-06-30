import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaleSettingsSectionComponent } from './locale-settings-section.component';

describe('LocaleSettingsSectionComponent', () => {
  let component: LocaleSettingsSectionComponent;
  let fixture: ComponentFixture<LocaleSettingsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocaleSettingsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaleSettingsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
