import { Injectable } from '@angular/core';
import { Settings } from '../../models/settings';
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

  public get settings(): Settings {
    const settings: Settings = this.loadIniFile.sync('settings.ini');
    const withSource = settings.recording.saveWithSource as string;
    settings.recording.saveWithSource = withSource;
    return settings;
  }

  public get savePath(): string {
    let path = this.settings.recording.savePath;
    if (path.substr(-1) === "/") {
      return path.slice(0, -1);
    }
    else
      return path
  }

  public get withSource(): boolean {
    const withSource = this.settings.recording.saveWithSource as string;
    return withSource == 'true';
  }

  public set settings(settings: Settings) {
    this.writeIniFile.sync('settings.ini', settings);
  }

  public set savePath(path: string) {
    const settings = this.settings;
    settings.recording.savePath = path;
    this.settings = settings;
  }

  public set withSource(condition: boolean) {
    const settings = this.settings;
    settings.recording.saveWithSource = condition.toString();
    this.settings = settings;
  }
}
