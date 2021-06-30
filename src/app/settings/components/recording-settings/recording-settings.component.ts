import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormControl, } from '@angular/forms';

import { Subscription, } from 'rxjs';

import { SettingsService } from '../../services';

@Component({
  selector: 'app-recording-settings',
  templateUrl: './recording-settings.component.html',
  styleUrls: ['./recording-settings.component.scss']
})
export class RecordingSettingsComponent implements OnInit {

  public readonly pathControl = new FormControl();

  public readonly saveToggle = new FormControl();

  private readonly subscriptions: Subscription[] = [];

  constructor(
    public readonly settings: SettingsService,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
