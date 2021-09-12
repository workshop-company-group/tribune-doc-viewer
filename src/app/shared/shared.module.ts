import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebviewDirective } from './directives/';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  IconButtonComponent,
  LargeIconButtonComponent,
  TextButtonComponent,
  SelectableButtonComponent
} from './components/buttons';
import { InputComponent } from './components/inputs';
import { BackdropComponent } from './components';
import { SelectComponent } from './components/selects';
import { ToggleComponent } from './components/toggles';

@NgModule({
  declarations: [
    WebviewDirective,
    BackdropComponent,
    LargeIconButtonComponent,
    TextButtonComponent,
    SelectableButtonComponent,
    InputComponent,
    SelectComponent,
    ToggleComponent,
    IconButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    WebviewDirective,
    BackdropComponent,
    IconButtonComponent,
    LargeIconButtonComponent,
    TextButtonComponent,
    SelectableButtonComponent,
    SelectComponent,
    ToggleComponent,
    InputComponent,
  ],
})
export class SharedModule {}
