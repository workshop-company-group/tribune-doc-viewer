import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSlideComponent } from './main-slide.component';

describe('MainSlideComponent', () => {
  let component: MainSlideComponent;
  let fixture: ComponentFixture<MainSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
