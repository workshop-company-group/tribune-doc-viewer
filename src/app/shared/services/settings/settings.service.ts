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
      saveWithSource: true,
      savePath: ''
    }
  };

  private _settings: Settings;

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.loadIniFile = window.require('read-ini-file');
      this.writeIniFile = window.require('write-ini-file');
      this.fs = window.require('fs');

      this.initIni();
    }
  }

  private save() {
    this.writeIniFile.sync(this.defaultPath, this._settings);
  }

  private initIni() {
    if (!this.fs.existsSync(this.defaultPath)) {
      this.writeIniFile(this.defaultPath, this.defaultSettings);
      this.settings = this.defaultSettings;
    } else {
      this.reload();
    }
  }

  public reload() {
    this.settings = this.loadIniFile(this.defaultPath);
  }

  private handleSettings(settings: Settings) {
    settings.recording.saveWithSource = (settings.recording.saveWithSource == 'true');

    if (settings.recording.savePath.substr(-1) === '/' ||
        settings.recording.savePath.substr(-1) === '\\')
      settings.recording.savePath = settings.recording.savePath.slice(0, -1);

    return settings;
  }

  public get settings(): Settings {
    return this._settings;
  }

  public get savePath(): string {
    return this.settings.recording.savePath;
  }

  public get withSource(): boolean {
    return (this.settings.recording.saveWithSource as boolean);
  }

  public set settings(settings: Settings) {
    this._settings = this.handleSettings(settings);
    this.save()
  }

  public set savePath(path: string) {
    const settings = this.settings
    settings.recording.savePath = path;
    this.settings = settings;
    this.save();
  }

  public set withSource(condition: boolean) {
    const settings = this.settings
    settings.recording.saveWithSource = condition;
    this.settings = settings;
    this.save()
  }
}
