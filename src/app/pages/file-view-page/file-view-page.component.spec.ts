import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileViewPageComponent } from './file-view-page.component';

describe('FileViewPageComponent', () => {
  let component: FileViewPageComponent;
  let fixture: ComponentFixture<FileViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileViewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
