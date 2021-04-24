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
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
