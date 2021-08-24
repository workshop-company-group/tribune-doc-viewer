import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ElectronService } from './core/services';

import { routeAnimations } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routeAnimations ],
})
export class AppComponent {

  constructor(
    private readonly electron: ElectronService,
  ) { }

  public prepareRoute(outlet: RouterOutlet): string {
    return outlet
      && outlet.activatedRouteData
      && outlet.activatedRouteData.animationState;
  }

}
