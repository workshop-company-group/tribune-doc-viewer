import { Pipe, PipeTransform } from '@angular/core';

import { combineLatest, isObservable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Locale } from '../models';
import { LocalesService } from '../services';
import { SettingsService } from '../../settings/services';

@Pipe({
  name: 'locale',
  pure: false,
})
export class LocalePipe implements PipeTransform {

  constructor(
    private readonly locales: LocalesService,
    private readonly settings: SettingsService,
  ) {}

  public transform(
    phrase: string | Observable<string>, ...args: string[]
  ): Observable<string> {
    if (isObservable(phrase)) {
      return combineLatest([
        phrase,
        this.settings.localeSubject,
      ]).pipe(
        map(([phrase, locale]) => this.translate(phrase, locale, args)),
      );
    }

    return this.settings.localeSubject.pipe(
      map(locale => this.translate(phrase, locale, args)),
    );
  }

  private translate(phrase: string, locale: Locale, args: string[]): string {
    const localedPhrase = this.locales.getLocaledPhrase(phrase, locale);

    let filledPhrase = localedPhrase;
    args.forEach((arg, index) => {
      filledPhrase = filledPhrase.replace(`{${index}}`, arg);
    });

    return filledPhrase;
  }

}
