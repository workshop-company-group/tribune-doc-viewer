import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileChooseConfirmationComponent } from './file-choose-confirmation.component';

describe('FileChooseConfirmationComponent', () => {
  let component: FileChooseConfirmationComponent;
  let fixture: ComponentFixture<FileChooseConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileChooseConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileChooseConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
