import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRoutingModule } from './password-routing.module';
import { PasswordPageComponent } from './components';

@NgModule({
  declarations: [
    PasswordPageComponent
  ],
  imports: [
    CommonModule,
    PasswordRoutingModule,
  ]
})
export class PasswordModule { }
