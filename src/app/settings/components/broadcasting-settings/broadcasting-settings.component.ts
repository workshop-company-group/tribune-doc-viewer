import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { interval, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { List } from 'immutable';

import { SettingsService } from '../../services';

const DISPLAY_RELOAD_PERIOD = 2000;

@Component({
  selector: 'app-broadcasting-settings',
  templateUrl: './broadcasting-settings.component.html',
  styleUrls: ['./broadcasting-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BroadcastingSettingsComponent implements OnDestroy, OnInit {

  public readonly deviceControl = new
  FormControl(this.settings.screenConnection);

  public readonly devicesSubject = new Subject<List<string>>();

  private readonly subscriptions: Subscription[] = [];

  constructor(
    public readonly settings: SettingsService,
  ) { }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.deviceControl.valueChanges.subscribe((device: string) => {
        this.settings.screenConnection = device;
      }),
      interval(DISPLAY_RELOAD_PERIOD).pipe(
        switchMap(() => this.settings.getAvailableDisplays()),
        map(displays => displays.map(display => display.connection)),
        distinctUntilChanged((curr, next) =>
          JSON.stringify(curr.sort()) === JSON.stringify(next.sort()),
        ),
      ).subscribe(devices => this.devicesSubject.next(List(devices))),
    );
  }

}
