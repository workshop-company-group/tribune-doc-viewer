import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormControl, } from '@angular/forms';

import { interval, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, switchMap, tap, map } from 'rxjs/operators';

import { SettingsService, } from '../../services';

const DISPLAY_RELOAD_PERIOD = 2000;

@Component({
  selector: 'app-broadcasting-settings',
  templateUrl: './broadcasting-settings.component.html',
  styleUrls: ['./broadcasting-settings.component.scss']
})
export class BroadcastingSettingsComponent implements OnDestroy, OnInit {

  public readonly deviceControl = new FormControl(this.settings.screenConnection);

  public readonly devicesSubject = new Subject<string[]>();

  private readonly subscriptions: Subscription[] = [];

  constructor(
    public readonly settings: SettingsService,
  ) { }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.deviceControl.valueChanges.subscribe(device =>
        this.settings.screenConnection = device),
      interval(DISPLAY_RELOAD_PERIOD).pipe(
        switchMap(() => this.settings.getAvailableDisplays()),
        map(displays => displays.map(display => display.connection)),
        distinctUntilChanged((curr, next) =>
          JSON.stringify(curr.sort()) === JSON.stringify(next.sort())
        ),
      ).subscribe(this.devicesSubject)
    );
  }

}
