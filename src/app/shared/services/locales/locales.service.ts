import { Injectable } from '@angular/core';
import { ElectronService } from '../../../core/services';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class LocalesService {

  private currentLocale;

  constructor(private electron: ElectronService,
              private settings: SettingsService) {
    if (!this.settings.locale) {
      console.log('system locale: ', this.getSystemLocale()) // mock
    }
  }

  private getSystemLocale() {
    const env = process.env;
    return env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
  }
}
