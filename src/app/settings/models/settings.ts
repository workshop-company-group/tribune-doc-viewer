import { Locale } from '../../locale/models';

export interface Settings {
  recording: {
    saveWithSource: boolean | string;
    savePath: string;
  };
  screen: {
    connection: string;
  };
  locales: {
    locale: Locale;
  };
}
