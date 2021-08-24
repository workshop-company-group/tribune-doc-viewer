import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicenseResolver } from './license/resolvers';
import { LicenseGuard } from './license/guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-menu',
    pathMatch: 'full',
  },
  {
    path: 'main-menu',
    loadChildren: () => import('./main-menu/main-menu.module').then(m => m.MainMenuModule),
    resolve: {
      license: LicenseResolver,
    },
    data: {
      animationState: 'main-menu',
    },
  },
  {
    path: 'file-view',
    loadChildren: () => import('./file-view/file-view.module').then(m => m.FileViewModule),
    canActivate: [
      LicenseGuard,
    ],
    data: {
      animationState: 'file-view',
    },
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    canActivate: [
      LicenseGuard,
    ],
    data: {
      animationState: 'settings',
    },
  },
  {
    path: 'password',
    loadChildren: () => import('./password/password.module').then(m => m.PasswordModule),
    canActivate: [
      LicenseGuard,
    ],
    data: {
      animationState: 'password',
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
