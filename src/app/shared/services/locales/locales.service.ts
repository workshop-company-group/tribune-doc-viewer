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
  private currentLocale: Locale;
  private localePhrases: object;

  constructor(private electron: ElectronService,
              private settings: SettingsService) {
    if (this.electron.isElectron) {
      this.fs = window.require('fs');

      if (!this.settings.locale)
        this.settings.locale = this.getSystemLocale();
    }
    this.localePhrases = this.readLocale()
    console.log(this.localePhrases);
  }

  private getSystemLocale() {
    const env = process.env;
    return (env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE).split('_')[0];
  }

  private readLocale() {
    const jsonBuffer = this.fs.readFileSync('src/assets/locale.json');
    return JSON.parse(jsonBuffer.toString())
  }

  public setLocale(locale: Locale) {
    this.settings.locale = locale;
  }

  public getLocaledPhrase(phrase: string, locale?: Locale | null): string {
    const requiredLocale = locale || this.settings.locale;
    const foundPhrase = this.localePhrases[phrase];
    let foundLocaledPhrase = '';
    if (foundPhrase) {
      foundLocaledPhrase = foundPhrase[requiredLocale];
      if (foundLocaledPhrase)
        return foundLocaledPhrase
      else
        throw new LocalesError('Could not found translation for required locale');
    } else
      throw new LocalesError('Could not found phrase');
  }
}
