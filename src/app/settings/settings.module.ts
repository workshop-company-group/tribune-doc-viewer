import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { LocaleModule } from '../locale/locale.module';
import { SharedModule } from '../shared/shared.module';

import {
  BroadcastingSettingsComponent,
  GeneralSettingsComponent,
  RecordingSettingsComponent,
  SettingsPageComponent,

  LocaleSettingsSectionComponent,
  PasswordSettingsSectionComponent,
  SettingsSectionComponent,
} from './components';

@NgModule({
  declarations: [
    BroadcastingSettingsComponent,
    GeneralSettingsComponent,
    RecordingSettingsComponent,
    SettingsPageComponent,
    LocaleSettingsSectionComponent,
    PasswordSettingsSectionComponent,
    SettingsSectionComponent,
  ],
  imports: [
    CommonModule,
    LocaleModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    SharedModule,
  ]
})
export class SettingsModule { }
