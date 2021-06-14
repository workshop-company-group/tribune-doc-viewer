import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideProgressBarComponent } from './slide-progress-bar.component';

describe('SlideProgressBarComponent', () => {
  let component: SlideProgressBarComponent;
  let fixture: ComponentFixture<SlideProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
