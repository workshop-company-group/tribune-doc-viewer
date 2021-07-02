import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainMenuRoutingModule } from './main-menu-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LicenseModule } from '../license/license.module';
import { LocaleModule } from '../locale/locale.module';

import { MainMenuPageComponent, } from './components';


@NgModule({
  declarations: [
    MainMenuPageComponent,
  ],
  imports: [
    CommonModule,
    LicenseModule,
    LocaleModule,
    MainMenuRoutingModule,
    SharedModule,
  ]
})
export class MainMenuModule { }
