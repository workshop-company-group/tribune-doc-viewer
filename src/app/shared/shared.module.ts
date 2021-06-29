import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import { LargeIconButtonComponent,
         NormalButtonComponent,
         SmallButtonComponent,
         SelectableButtonComponent, } from './components/buttons';
import { InputComponent, } from './components/inputs';
import { BackdropComponent } from './components';
import { SelectComponent } from './components/selects';

@NgModule({
  declarations: [
    WebviewDirective,
    BackdropComponent,
    LargeIconButtonComponent,
    NormalButtonComponent,
    SmallButtonComponent,
    SelectableButtonComponent,
    InputComponent,
    SelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    WebviewDirective,
    BackdropComponent,
    LargeIconButtonComponent,
    NormalButtonComponent,
    SmallButtonComponent,
    SelectableButtonComponent,
    SelectComponent,
    InputComponent,
  ]
})
export class SharedModule {}
