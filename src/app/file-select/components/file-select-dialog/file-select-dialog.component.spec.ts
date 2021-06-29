import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSelectDialogComponent } from './file-select-dialog.component';

describe('FileSelectDialogComponent', () => {
  let component: FileSelectDialogComponent;
  let fixture: ComponentFixture<FileSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSelectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
