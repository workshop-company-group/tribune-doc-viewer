import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  IconButtonComponent,
  LargeIconButtonComponent,
  TextButtonComponent,
} from './components/buttons';
import { InputComponent } from './components/inputs';
import {
  BackdropComponent,
  SpinnerComponent,
} from './components';
import { SelectComponent } from './components/selects';
import { ToggleComponent } from './components/toggles';
import { SelectableButtonDirective } from './directives';

@NgModule({
  declarations: [
    BackdropComponent,
    LargeIconButtonComponent,
    TextButtonComponent,
    InputComponent,
    SelectComponent,
    ToggleComponent,
    IconButtonComponent,
    SpinnerComponent,
    SelectableButtonDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    BackdropComponent,
    IconButtonComponent,
    LargeIconButtonComponent,
    TextButtonComponent,
    SelectComponent,
    ToggleComponent,
    InputComponent,
    SpinnerComponent,
    SelectableButtonDirective,
  ],
})
export class SharedModule {}
