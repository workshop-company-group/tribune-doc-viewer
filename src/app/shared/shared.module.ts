import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';

import { LargeIconButtonComponent,
         NormalButtonComponent,
         SmallButtonComponent,
         SelectableButtonComponent, } from './components/buttons';

@NgModule({
  declarations: [
    WebviewDirective,
    LargeIconButtonComponent,
    NormalButtonComponent,
    SmallButtonComponent,
    SelectableButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    WebviewDirective,
    FormsModule,
    LargeIconButtonComponent,
    NormalButtonComponent,
    SmallButtonComponent,
    SelectableButtonComponent,
  ]
})
export class SharedModule {}
