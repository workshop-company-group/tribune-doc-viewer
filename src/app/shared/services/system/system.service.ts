import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor() { }

  public getSystemLocale(): string | null {
    const env = process.env;
    const sysLanguage = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE || null;
    if (sysLanguage) return sysLanguage.split('_')[0];
    return null;
  }
}
