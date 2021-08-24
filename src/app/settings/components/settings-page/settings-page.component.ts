import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { BehaviorSubject, Subscription } from 'rxjs';

import { SettingsRoute } from '../../models';

import { routeAnimations } from '../../animations/route-animations';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  animations: [ routeAnimations ],
})
export class SettingsPageComponent implements OnInit, OnDestroy {

  public readonly routeSubject = new
  BehaviorSubject<SettingsRoute>('general');

  private readonly subscriptions: Subscription[] = [];

  constructor(
    public readonly router: Router,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.routeSubject.subscribe(route =>
        void this.router.navigateByUrl(`/settings/${route}`),
      ),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public prepareRoute(outlet: RouterOutlet): string {
    if (!outlet.activatedRouteData.animationState) {
      throw new Error('Error: Animation state is not defined');
    }
    return outlet.activatedRouteData.animationState as string;
  }

}
