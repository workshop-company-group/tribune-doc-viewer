import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import { LargeIconButtonComponent,
         NormalButtonComponent,
         SmallButtonComponent } from './components/buttons';
import { InputComponent, } from './components/inputs';

@NgModule({
  declarations: [
    WebviewDirective,
    LargeIconButtonComponent,
    NormalButtonComponent,
    SmallButtonComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    WebviewDirective,
    FormsModule,
    LargeIconButtonComponent,
    NormalButtonComponent,
    SmallButtonComponent,
    InputComponent
  ]
})
export class SharedModule {}
