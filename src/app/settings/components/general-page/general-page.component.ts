import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormControl, } from '@angular/forms';

import { Subscription, } from 'rxjs';

import { AppConfig } from '../../../../environments/environment';

import { Locale, } from '../../../shared/models';

import { SettingsService, } from '../../services';

@Component({
  selector: 'app-general-page',
  templateUrl: './general-page.component.html',
  styleUrls: ['./general-page.component.scss']
})
export class GeneralPageComponent implements OnInit, OnDestroy {

  public readonly localeControl = new FormControl(this.settings.locale);

  private readonly subscriptions: Subscription[] = [];

  constructor(
    public readonly settings: SettingsService,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.localeControl.valueChanges.subscribe(locale =>
        this.settings.locale = locale)
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public get locales(): Locale[] {
    return AppConfig.supportedLangs;
  }

}
