import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocaleModule } from '../locale/locale.module';
import { SharedModule } from '../shared/shared.module';

import { FileSelectDialogComponent } from './components';

@NgModule({
  declarations: [
    FileSelectDialogComponent,
  ],
  imports: [
    CommonModule,
    LocaleModule,
    SharedModule,
  ],
  exports: [
    FileSelectDialogComponent,
  ],
})
export class FileSelectModule { }
