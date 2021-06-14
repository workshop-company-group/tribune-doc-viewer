import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule, } from '../shared/shared.module';

import { LicenseDialogComponent, } from './components';


@NgModule({
  declarations: [
    LicenseDialogComponent,
  ],
  exports: [
    LicenseDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class LicenseModule { }
