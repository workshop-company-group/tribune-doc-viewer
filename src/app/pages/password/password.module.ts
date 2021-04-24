import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRoutingModule } from './password-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { PasswordPageComponent } from './components';

@NgModule({
  declarations: [
    PasswordPageComponent
  ],
  imports: [
    CommonModule,
    PasswordRoutingModule,
    SharedModule,
  ]
})
export class PasswordModule { }
