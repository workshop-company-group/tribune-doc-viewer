import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  BroadcastingPageComponent,
  GeneralPageComponent,
  RecordingPageComponent,
  SettingsPageComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: SettingsPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'general',
        pathMatch: 'full',
      },
      {
        path: 'broadcasting',
        component: BroadcastingPageComponent,
      },
      {
        path: 'general',
        component: GeneralPageComponent,
      },
      {
        path: 'recording',
        component: RecordingPageComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
