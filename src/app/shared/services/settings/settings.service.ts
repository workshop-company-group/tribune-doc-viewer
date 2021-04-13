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

  public async getSettings(): Promise<Settings> {
    return this.loadIniFile('settings.ini')
  }

  public async getSavePath(): Promise<string> {
    return (await this.getSettings()).recording.savePath;
  }

  public async getSaveWithSource(): Promise<boolean> {
    return Boolean((await this.getSettings()).recording.saveWithSource);
  }

  public async setSettings(settings: Settings): Promise<void> {
    this.writeIniFile('settings.ini', settings);
  }

  public async setSavePath(path: string): Promise<void> {
    const settings = await this.getSettings();
    settings.recording.savePath = path;
    this.setSettings(settings);
  }

  public async setSaveWithSource(condition: boolean): Promise<void> {
    const settings = await this.getSettings();
    settings.recording.saveWithSource = condition;
    this.setSettings(settings);
  }
}
