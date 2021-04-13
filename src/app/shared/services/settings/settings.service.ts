import { Injectable } from '@angular/core';
import { Settings } from './settings';
import * as loadIniFile from 'read-ini-file';
import * as writeIniFile from 'write-ini-file';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  loadIniFile: typeof loadIniFile;
  writeIniFile: typeof writeIniFile

  constructor() {
    this.loadIniFile = window.require('read-ini-file');
    this.writeIniFile = window.require('write-ini-file');
  }

  public getSettings(): Settings {
    return this.loadIniFile.sync('settings.ini')
  }

  public getSavePath(): string {
    return this.getSettings().recording.savePath;
  }

  public getSaveWithSource(): boolean {
    return (this.getSettings().recording.saveWithSource as string).toLowerCase() === 'true';
  }

  public setSettings(settings: Settings): void {
    this.writeIniFile.sync('settings.ini', settings);
  }

  public setSavePath(path: string): void {
    const settings = this.getSettings();
    settings.recording.savePath = path;
    this.setSettings(settings);
  }

  public setSaveWithSource(condition: boolean): void {
    const settings = this.getSettings();
    settings.recording.saveWithSource = condition.toString();
    this.setSettings(settings);
  }
}
