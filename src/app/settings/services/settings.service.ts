import { Injectable } from '@angular/core';

import * as loadIniFile from 'read-ini-file';
import * as writeIniFile from 'write-ini-file';
import * as fs from 'fs';
import * as si from 'systeminformation';

import { Settings } from '../models';
import { Display, Locale } from '../../shared/models';

import { SystemService } from '../../shared/services';
import { ElectronService } from '../../core/services';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  loadIniFile: typeof loadIniFile;
  writeIniFile: typeof writeIniFile
  fs: typeof fs;
  si: typeof si;

  private readonly defaultPath: string = 'settings.ini';
  private readonly defaultSettings: Settings = {
    recording: {
      saveWithSource: true,
      savePath: ''
    },
    screen: {
      connection: ''
    },
    locales: {
      locale: this.system.getSystemLocale() ?? 'en'
    }
  };

  private _settings: Settings;

  constructor(private electron: ElectronService,
              private system: SystemService) {
    if (this.electron.isElectron) {
      this.loadIniFile = window.require('read-ini-file');
      this.writeIniFile = window.require('write-ini-file');
      this.fs = window.require('fs');
      this.si = window.require('systeminformation');

      this.initIni();
      this.checkDisplay();
    }
  }

  private save() {
    this.writeIniFile.sync(this.defaultPath, this._settings);
  }

  private initIni() {
    console.log('init ini');
    if (!this.fs.existsSync(this.defaultPath)) {
      this.writeIniFile(this.defaultPath, this.defaultSettings);
      console.log('not exist');
      this.settings = this.defaultSettings;
    } else {
      this.reload();
    }
  }

  public async checkDisplay(): Promise<void> {
    const displays = await this.getAvailableDisplays();
    const conn = this.screenConnection;
    let found = [];

    if (conn !== '')
      found = displays.filter(display => {
        display.connection === this.settings.screen.connection
      });

    if (found.length > 0) {
      return;
    } else if (displays.length > 0) {
      this.screenConnection = displays[0].connection;
    } else {
      this.screenConnection = '';
    }
  }

  public reload() {
    this.settings = this.loadIniFile.sync(this.defaultPath);
  }

  private handleSettings(settings: Settings) {
    settings.recording.saveWithSource = (settings.recording.saveWithSource == 'true' ||
                                         settings.recording.saveWithSource === true);

    if (settings.recording.savePath.substr(-1) === '/' ||
        settings.recording.savePath.substr(-1) === '\\')
      settings.recording.savePath = settings.recording.savePath.slice(0, -1);

    return settings;
  }

  public async getAvailableDisplays(): Promise<Display[]> {
    const displays = (await this.si.graphics()).displays;
    if (displays.length < 3)
      return [];
    else
      return displays.slice(2);
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

  public get screenConnection(): string {
    return (this.settings.screen.connection);
  }

  public get locale(): Locale {
    return (this.settings.locales.locale);
  }

  public set settings(settings: Settings) {
    this._settings = this.handleSettings(settings);
    this.save()
  }

  public set savePath(path: string) {
    const settings = this.settings
    settings.recording.savePath = path;
    this.settings = settings;
  }

  public set withSource(condition: boolean) {
    const settings = this.settings
    settings.recording.saveWithSource = condition;
    this.settings = settings;
  }

  public set screenConnection(connection: string) {
    const settings = this.settings
    settings.screen.connection = connection;
    this.settings = settings;
  }

  public set locale(locale: Locale) {
    const settings = this.settings
    settings.locales.locale = locale;
    this.settings = settings;
  }
}
