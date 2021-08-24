import { Pipe, PipeTransform } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalesService } from '../services';
import { SettingsService } from '../../settings/services';

@Pipe({
  name: 'locale',
})
export class LocalePipe implements PipeTransform {

  constructor(
    private readonly locales: LocalesService,
    private readonly settings: SettingsService,
  ) {}

  public transform(phrase: string, ...args: string[]): Observable<string> {
    return this.settings.localeSubject.pipe(
      map((locale) => this.locales.getLocaledPhrase(phrase, locale)),
      map((phrase) => {
        for (const index in args) {
          phrase = phrase.replace(`{${index}}`, args[index]);
        }
        return phrase;
      }),
    );
  }

}
