import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocaleModule } from '../locale/locale.module';
import { SharedModule } from '../shared/shared.module';

import {
  NetworkConfirmationComponent,
} from './components';

@NgModule({
  declarations: [
    NetworkConfirmationComponent,
  ],
  imports: [
    CommonModule,
    LocaleModule,
    SharedModule,
  ],
  exports: [
    NetworkConfirmationComponent,
  ],
})
export class NetworkModule { }
