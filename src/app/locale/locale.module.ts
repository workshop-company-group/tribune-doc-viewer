import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalePipe } from './pipes';


@NgModule({
  declarations: [
    LocalePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LocalePipe,
  ],
})
export class LocaleModule { }
