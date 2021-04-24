import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileSelectDialogComponent } from './components';

@NgModule({
  declarations: [
    FileSelectDialogComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FileSelectDialogComponent,
  ],
})
export class FileSelectModule { }
