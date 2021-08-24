import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileViewPageComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: FileViewPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileViewRoutingModule { }
