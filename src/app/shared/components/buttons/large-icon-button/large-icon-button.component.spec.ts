import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeIconButtonComponent } from './large-icon-button.component';

describe('LargeIconButtonComponent', () => {
  let component: LargeIconButtonComponent;
  let fixture: ComponentFixture<LargeIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeIconButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
