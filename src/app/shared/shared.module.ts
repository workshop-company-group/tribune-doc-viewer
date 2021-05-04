import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import { LargeIconButtonComponent,
         NormalButtonComponent,
         SmallButtonComponent,
         SelectableButtonComponent, } from './components/buttons';
import { InputComponent, } from './components/inputs';

@NgModule({
  declarations: [
    WebviewDirective,
    LargeIconButtonComponent,
    NormalButtonComponent,
    SmallButtonComponent,
    SelectableButtonComponent,
    InputComponent,
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
    SelectableButtonComponent,
    InputComponent,
  ]
})
export class SharedModule {}
