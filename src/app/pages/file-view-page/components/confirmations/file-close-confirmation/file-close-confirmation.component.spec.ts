import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileCloseConfirmationComponent } from './file-close-confirmation.component';

describe('FileCloseConfirmationComponent', () => {
  let component: FileCloseConfirmationComponent;
  let fixture: ComponentFixture<FileCloseConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileCloseConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileCloseConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
