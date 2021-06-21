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

  constructor(private electron: ElectronService,
              private settings: SettingsService) {
    this.fs = window.require('fs');

    if (!this.settings.locale) this.settings.locale = this.getSystemLocale();
    this.localePhrases = this.readLocale()
  }

  private getSystemLocale() {
    const env = process.env;
    const sysLanguage = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE || null;
    if (sysLanguage)
      return sysLanguage.split('_')[0];
    else
      return 'en';
  }

  private readLocale() {
    const jsonBuffer = this.fs.readFileSync('src/assets/locale.json');
    return JSON.parse(jsonBuffer.toString())
  }

  public getLocaledPhrase(phrase: string, locale?: Locale | null): string {
    const requiredLocale = locale || this.settings.locale;
    const foundPhrase = this.localePhrases[phrase];

    if (!foundPhrase) throw new LocalesError('Could not found translation for required locale');
      const foundLocaledPhrase = foundPhrase[requiredLocale];
    if (!phrase) throw new LocalesError('Could not found phrase');
      return foundLocaledPhrase;
  }
}
