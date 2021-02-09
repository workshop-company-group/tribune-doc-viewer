import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';

import { LargeIconButtonComponent,
         NormalButtonComponent } from './components/buttons';

@NgModule({
  declarations: [
    WebviewDirective,
    LargeIconButtonComponent,
    NormalButtonComponent
  ],
  imports: [
    CommonModule, 
    FormsModule
  ],
  exports: [
    WebviewDirective, 
    FormsModule,
    LargeIconButtonComponent,
    NormalButtonComponent
  ]
})
export class SharedModule {}
