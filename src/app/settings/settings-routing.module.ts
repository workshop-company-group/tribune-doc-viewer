import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  BroadcastingSettingsComponent,
  GeneralSettingsComponent,
  RecordingSettingsComponent,
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
        component: BroadcastingSettingsComponent,
        data: {
          animationState: 'broadcasting',
        },
      },
      {
        path: 'general',
        component: GeneralSettingsComponent,
        data: {
          animationState: 'general',
        },
      },
      {
        path: 'recording',
        component: RecordingSettingsComponent,
        data: {
          animationState: 'recording',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule { }
