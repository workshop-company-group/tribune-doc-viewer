import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainMenuPageComponent } from './pages';

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
    loadChildren: () => import('./pages/file-view/file-view.module').then(m => m.FileViewModule),
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
