import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileViewBackgroundComponent } from './file-view-background.component';

describe('FileViewBackgroundComponent', () => {
  let component: FileViewBackgroundComponent;
  let fixture: ComponentFixture<FileViewBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileViewBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileViewBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
