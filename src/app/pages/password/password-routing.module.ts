import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordPageComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: PasswordPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRoutingModule { }
