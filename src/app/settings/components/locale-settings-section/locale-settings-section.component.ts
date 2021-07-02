import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormControl, } from '@angular/forms';

import { AppConfig } from '../../../../environments/environment';
import { Locale, } from '../../../locale/models';
import Languages from '../../../../assets/languages.json';

import { Subscription, } from 'rxjs';
import { map, } from 'rxjs/operators';

import { SettingsService, } from '../../services';


@Component({
  selector: 'app-locale-settings-section',
  templateUrl: './locale-settings-section.component.html',
  styleUrls: ['./locale-settings-section.component.scss']
})
export class LocaleSettingsSectionComponent implements OnInit, OnDestroy {

  public readonly localeControl = new FormControl(
    Languages[this.settings.locale]
  );

  public readonly languages =
    AppConfig.supportedLangs.map(lang => Languages[lang]);

  private readonly subscriptions: Subscription[] = [];

  constructor(
    public readonly settings: SettingsService,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.localeControl.valueChanges.pipe(
        map(language => {
          for (const locale of Object.keys(Languages)) {
            if (language === Languages[locale]) {
              return locale;
            }
          }
        }),
      ).subscribe(locale => {
        this.settings.locale = locale;
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
