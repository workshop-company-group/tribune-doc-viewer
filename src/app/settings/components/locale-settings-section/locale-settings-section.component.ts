import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from 'immutable';

import { AppConfig } from '../../../../environments/environment';
import Languages from '../../../../assets/languages.json';

import { SettingsService } from '../../services';

@Component({
  selector: 'app-locale-settings-section',
  templateUrl: './locale-settings-section.component.html',
  styleUrls: ['./locale-settings-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocaleSettingsSectionComponent implements OnInit, OnDestroy {

  public readonly localeControl = new FormControl(
    Languages[this.settings.locale],
  );

  public readonly languages = List(
    AppConfig.supportedLangs.map(lang => Languages[lang] as string),
  );

  private readonly subscriptions: Subscription[] = [];

  constructor(
    public readonly settings: SettingsService,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.localeControl.valueChanges.pipe(
        map(language =>
          Object.keys(Languages).find(lang => Languages[lang] === language)),
      ).subscribe(locale => {
        if (!locale) {
          throw new Error('Error: Failed to set language. Unknown language.');
        }
        this.settings.locale = locale;
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
