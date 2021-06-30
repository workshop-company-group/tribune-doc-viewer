import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormControl, } from '@angular/forms';

import { AppConfig } from '../../../../environments/environment';
import { Locale, } from '../../../locale/models';

import { Subscription, } from 'rxjs';

import { SettingsService, } from '../../services';

@Component({
  selector: 'app-locale-settings-section',
  templateUrl: './locale-settings-section.component.html',
  styleUrls: ['./locale-settings-section.component.scss']
})
export class LocaleSettingsSectionComponent implements OnInit, OnDestroy {

  public readonly localeControl = new FormControl(this.settings.locale);

  private readonly subscriptions: Subscription[] = [];

  constructor(
    public readonly settings: SettingsService,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.localeControl.valueChanges.subscribe(locale => {
        this.settings.locale = locale;
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public get locales(): Locale[] {
    return AppConfig.supportedLangs;
  }

}
