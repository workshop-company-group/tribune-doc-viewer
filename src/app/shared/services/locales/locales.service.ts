import { Injectable } from '@angular/core';
import { Locale } from '../../models';
import { ElectronService } from '../../../core/services';
import { SettingsService } from '../settings/settings.service';

import * as fs from 'fs';
import { LocalesError } from '../exceptions';

@Injectable({
  providedIn: 'root'
})
export class LocalesService {
  fs: typeof fs;
  private localePhrases: object;

  constructor(private settings: SettingsService) {
    this.fs = window.require('fs');
    this.localePhrases = this.readLocale()
  }

  private readLocale() {
    const jsonBuffer = this.fs.readFileSync('src/assets/locale.json');
    return JSON.parse(jsonBuffer.toString());
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
