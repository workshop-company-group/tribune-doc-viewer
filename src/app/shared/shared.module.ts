import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';

import { NormalButtonComponent } from './components/buttons';

@NgModule({
  declarations: [
    WebviewDirective,
    NormalButtonComponent
  ],
  imports: [
    CommonModule, 
    FormsModule
  ],
  exports: [
    WebviewDirective, 
    FormsModule,
    NormalButtonComponent
  ]
})
export class SharedModule {}
