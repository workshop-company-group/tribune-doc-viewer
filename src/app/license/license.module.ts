import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule, } from '../shared/shared.module';

import { LicenseDialogComponent,
  LicenseKeyInputComponent, } from './components';


@NgModule({
  declarations: [
    LicenseDialogComponent,
    LicenseKeyInputComponent,
  ],
  exports: [
    LicenseDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class LicenseModule { }
