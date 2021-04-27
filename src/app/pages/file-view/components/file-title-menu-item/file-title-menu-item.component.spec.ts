import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTitleMenuItemComponent } from './file-title-menu-item.component';

describe('FileTitleMenuItemComponent', () => {
  let component: FileTitleMenuItemComponent;
  let fixture: ComponentFixture<FileTitleMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileTitleMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTitleMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
