import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, } from '@angular/forms';

import { PasswordRoutingModule } from './password-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PasswordPageComponent } from './components';

@NgModule({
  declarations: [
    PasswordPageComponent
  ],
  imports: [
    CommonModule,
    PasswordRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class PasswordModule { }
