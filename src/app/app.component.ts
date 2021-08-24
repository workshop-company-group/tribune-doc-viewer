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
    if (!outlet.activatedRouteData.animationState) {
      throw new Error('Error: Animation state is not defined');
    }
    return outlet.activatedRouteData.animationState as string;
  }

}
