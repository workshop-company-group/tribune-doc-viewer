import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideThumbnailComponent } from './slide-thumbnail.component';

describe('SlideThumbnailComponent', () => {
  let component: SlideThumbnailComponent;
  let fixture: ComponentFixture<SlideThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
