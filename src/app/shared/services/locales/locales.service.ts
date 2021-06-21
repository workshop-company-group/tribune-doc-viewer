import { Injectable } from '@angular/core';
import { Locale } from '../../models';
import { SettingsService } from '../settings/settings.service';
import * as fs from 'fs';
import { LocalesError } from '../exceptions';

import * as phrases from '../../../../assets/locale.json';


@Injectable({
  providedIn: 'root'
})
export class LocalesService {
  fs: typeof fs;

  private localePhrases = phrases;

  constructor(private settings: SettingsService) {
    this.fs = window.require('fs');
  }

  public setLocale(locale: Locale) {
    this.settings.locale = locale;
  }

  public getLocaledPhrase(phrase: string, locale?: Locale | null): string {
    const requiredLocale = locale ?? this.settings.locale;
    const foundPhrase = this.localePhrases[phrase];

    if (!foundPhrase) throw new LocalesError('Could not found translation for required locale');
      const foundLocaledPhrase = foundPhrase[requiredLocale];
    if (!phrase) throw new LocalesError('Could not found phrase');
      return foundLocaledPhrase;
  }
}
