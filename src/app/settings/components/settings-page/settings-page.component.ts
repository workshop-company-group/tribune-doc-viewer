import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Router, } from '@angular/router';

import { BehaviorSubject, Subscription, } from 'rxjs';

import { SettingsRoute, } from '../../models';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit, OnDestroy {

  public readonly routeSubject =
    new BehaviorSubject<SettingsRoute>('general');

  private readonly subscriptions: Subscription[] = [];

  constructor(
    public readonly router: Router,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.routeSubject.subscribe(route =>
        this.router.navigateByUrl(`/settings/${route}`))
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
