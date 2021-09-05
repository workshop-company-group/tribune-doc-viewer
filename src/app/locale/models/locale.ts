import { AppConfig } from '../../../environments/environment';

type Locale = typeof AppConfig.supportedLangs[number];

type Phrase = {[key in Locale]: string};

interface Phrases {
  [key: string]: Phrase;
}

export { Locale, Phrase, Phrases };
