import { Injectable } from '@angular/core';
import { Locale, Phrase, Phrases } from '../../models';
import { SettingsService } from '../settings/settings.service';
import { LocalesError } from '../exceptions';

import * as phrases from '../../../../assets/locale.json';


@Injectable({
  providedIn: 'root'
})
export class LocalesService {

  private localePhrases: Phrases = phrases;

  constructor(private settings: SettingsService) { }

  public getLocaledPhrase(phrase: string, locale?: Locale | null): string {
    const requiredLocale: Locale = locale ?? this.settings.locale;
    const foundPhrase: Phrase = this.localePhrases[phrase];

    if (!foundPhrase) throw new LocalesError('Could not found translation for required locale');
    const foundLocaledPhrase = foundPhrase[requiredLocale];

    if (!phrase) throw new LocalesError('Could not found phrase');
    return foundLocaledPhrase;
  }
}