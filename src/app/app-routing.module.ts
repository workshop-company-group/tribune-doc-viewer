import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileViewPageComponent,
         MainMenuPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-menu',
    pathMatch: 'full'
  },
  {
    path: 'main-menu',
    component: MainMenuPageComponent
  },
  {
    path: 'file-view',
    component: FileViewPageComponent
  },
  {
    path: 'password',
    loadChildren: () => import('./pages/password/password.module').then(m => m.PasswordModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
