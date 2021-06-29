import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../shared/shared.module';

import {
  BroadcastingPageComponent,
  GeneralPageComponent,
  RecordingPageComponent,
  SettingsPageComponent,
} from './components';

@NgModule({
  declarations: [
    BroadcastingPageComponent,
    GeneralPageComponent,
    RecordingPageComponent,
    SettingsPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    SharedModule,
  ]
})
export class SettingsModule { }
