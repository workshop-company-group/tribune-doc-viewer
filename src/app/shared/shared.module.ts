import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';

import { LargeIconButtonComponent,
         NormalButtonComponent,
         SmallButtonComponent } from './components/buttons';

@NgModule({
  declarations: [
    WebviewDirective,
    LargeIconButtonComponent,
    NormalButtonComponent,
    SmallButtonComponent
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
  ]
})
export class SharedModule {}
