import { Locale } from './';

export interface Settings {
  recording: {
    saveWithSource: boolean | string;
    savePath: string;
  },
  screen: {
    connection: string;
  },
  locales: {
    locale: Locale
  }
}
