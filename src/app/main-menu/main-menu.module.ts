import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainMenuRoutingModule } from './main-menu-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MainMenuPageComponent, } from './components';


@NgModule({
  declarations: [
    MainMenuPageComponent,
  ],
  imports: [
    CommonModule,
    MainMenuRoutingModule,
    SharedModule,
  ]
})
export class MainMenuModule { }
