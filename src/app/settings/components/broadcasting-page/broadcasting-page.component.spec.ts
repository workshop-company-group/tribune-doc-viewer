import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastingPageComponent } from './broadcasting-page.component';

describe('BroadcastingPageComponent', () => {
  let component: BroadcastingPageComponent;
  let fixture: ComponentFixture<BroadcastingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BroadcastingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
