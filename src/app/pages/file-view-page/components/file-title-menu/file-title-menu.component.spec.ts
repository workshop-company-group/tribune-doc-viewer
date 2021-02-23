import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTitleMenuComponent } from './file-title-menu.component';

describe('FileTitleMenuComponent', () => {
  let component: FileTitleMenuComponent;
  let fixture: ComponentFixture<FileTitleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileTitleMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTitleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
