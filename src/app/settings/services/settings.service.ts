import { Injectable } from '@angular/core';
import { remote } from 'electron';
const { app } = remote;

import * as loadIniFile from 'read-ini-file';
import * as writeIniFile from 'write-ini-file';
import * as fs from 'fs';
import * as path from 'path';
import * as si from 'systeminformation';

import { BehaviorSubject, } from 'rxjs';

import { Settings } from '../models';
import { Locale } from '../../locale/models';
import { Display, } from '../../shared/models';

import { SystemService } from '../../shared/services';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly defaultPath: string = path.join(app.getPath('userData'), 'settings.ini');

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

  public localeSubject = new BehaviorSubject<Locale>(
    this.defaultSettings.locales.locale
  );

  private _settings: Settings;

  constructor(
    private readonly system: SystemService
  ) {
    this.initIni();
    this.checkDisplay();
  }

  private save() {
    writeIniFile.sync(this.defaultPath, this._settings);
  }

  private initIni() {
    if (!fs.existsSync(this.defaultPath)) {
      writeIniFile(this.defaultPath, this.defaultSettings);
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
      for(const display of displays)
        if (display.connection === this.settings.screen.connection)
          return;

    if (displays.length > 0) {
      this.screenConnection = displays[0].connection;
    } else {
      this.screenConnection = '';
    }
  }

  public reload() {
    this.settings = loadIniFile.sync(this.defaultPath);
    this.localeSubject.next(this.settings.locales.locale);
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
    const displays = (await si.graphics()).displays;
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
    this.localeSubject.next(locale);
    const settings = this.settings
    settings.locales.locale = locale;
    this.settings = settings;
  }
}
