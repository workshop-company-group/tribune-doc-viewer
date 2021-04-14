import { Injectable } from '@angular/core';
import { Settings } from '../../models/settings';
import * as loadIniFile from 'read-ini-file';
import * as writeIniFile from 'write-ini-file';
import * as fs from 'fs';
import { ElectronService } from '../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  loadIniFile: typeof loadIniFile;
  writeIniFile: typeof writeIniFile
  fs: typeof fs;

  private readonly defaultPath: string = 'settings.ini';
  private readonly defaultSettings: Settings = {
    recording: {
      saveWithSource: 'true',
      savePath: ''
    }
  };

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.loadIniFile = window.require('read-ini-file');
      this.writeIniFile = window.require('write-ini-file');
      this.fs = window.require('fs');

      this.initInit();
    }
  }

  private initInit() {
    if (!this.fs.existsSync(this.defaultPath)) {
      this.writeIniFile(this.defaultPath, this.defaultSettings);
    }
  }

  public get settings(): Settings {
    const settings: Settings = this.loadIniFile.sync(this.defaultPath);
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
    settings.recording.saveWithSource = settings.recording.saveWithSource.toString();
    this.writeIniFile.sync(this.defaultPath, settings);
  }

  public set savePath(path: string) {
    this.settings.recording.savePath = path;
  }

  public set withSource(condition: boolean) {
    this.settings.recording.saveWithSource = condition.toString();
  }
}
