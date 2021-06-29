import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { FileSelectDialogComponent } from './components';

@NgModule({
  declarations: [
    FileSelectDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    FileSelectDialogComponent,
  ],
})
export class FileSelectModule { }
