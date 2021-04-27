import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSelectConfirmationComponent } from './file-select-confirmation.component';

describe('FileSelectConfirmationComponent', () => {
  let component: FileSelectConfirmationComponent;
  let fixture: ComponentFixture<FileSelectConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSelectConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSelectConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
