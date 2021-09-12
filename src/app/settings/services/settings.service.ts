import { Injectable } from '@angular/core';
import { remote } from 'electron';
const { app } = remote;

import * as loadIniFile from 'read-ini-file';
import * as writeIniFile from 'write-ini-file';
import * as fs from 'fs';
import * as path from 'path';
import * as si from 'systeminformation';

import { BehaviorSubject } from 'rxjs';

import { Settings } from '../models';
import { Locale } from '../../locale/models';
import { Display } from '../../shared/models';

import { SystemService } from '../../shared/services';

const UNIX_INTERNAL_DISPLAYS = 3;
const WINDOWS_INTERNAL_DISPLAYS = 2;

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly defaultPath: string = path.join(app.getPath('userData'), 'settings.ini');

  private readonly defaultSettings: Settings = {
    recording: {
      saveWithSource: true,
      savePath: '',
    },
    screen: {
      connection: '',
    },
    locales: {
      locale: this.system.getSystemLocale() ?? 'en',
    },
  };

  public localeSubject = new BehaviorSubject<Locale>(
    this.defaultSettings.locales.locale,
  );

  private _settings: Settings;

  constructor(
    private readonly system: SystemService,
  ) {
    this.initIni();
    void this.checkDisplay();
  }

  private save(): void {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    writeIniFile.sync(this.defaultPath, this._settings);
  }

  private initIni(): void {
    if (fs.existsSync(this.defaultPath)) {
      this.reload();
    } else {
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      writeIniFile(this.defaultPath, this.defaultSettings);
      this.settings = this.defaultSettings;
    }
  }

  public async checkDisplay(): Promise<void> {
    const displays = await this.getAvailableDisplays();

    const conn = this.screenConnection;

    if (conn !== '')
      for (const display of displays)
        if (display.connection === this.settings.screen.connection)
          return;

    if (displays.length > 0) {
      this.screenConnection = displays[0].connection;
    } else {
      this.screenConnection = '';
    }
  }

  public reload(): void {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    this.settings = loadIniFile.sync(this.defaultPath);
    this.localeSubject.next(this.settings.locales.locale);
  }

  private handleSettings(settings: Settings): Settings {
    settings.recording.saveWithSource = (settings.recording.saveWithSource === 'true' ||
                                         settings.recording.saveWithSource);

    if (settings.recording.savePath.substr(-1) === '/' ||
        settings.recording.savePath.substr(-1) === '\\')
      settings.recording.savePath = settings.recording.savePath.slice(0, -1);

    return settings;
  }


  public async getAvailableDisplays(): Promise<Display[]> {
    const displays = (await si.graphics()).displays;
    const internalDisplays = process.platform === 'win32' ? WINDOWS_INTERNAL_DISPLAYS : UNIX_INTERNAL_DISPLAYS;

    if (displays.length < internalDisplays)
      return [];
    return displays.slice(internalDisplays - 1);
  }

  public get settings(): Settings {
    return this._settings;
  }

  public set settings(settings: Settings) {
    this._settings = this.handleSettings(settings);
    this.save();
  }

  public get savePath(): string {
    return this.settings.recording.savePath;
  }

  public set savePath(path: string) {
    const settings = this.settings;
    settings.recording.savePath = path;
    this.settings = settings;
  }

  public get withSource(): boolean {
    return (this.settings.recording.saveWithSource as boolean);
  }

  public set withSource(condition: boolean) {
    const settings = this.settings;
    settings.recording.saveWithSource = condition;
    this.settings = settings;
  }

  public get screenConnection(): string {
    return (this.settings.screen.connection);
  }

  public set screenConnection(connection: string) {
    const settings = this.settings;
    settings.screen.connection = connection;
    this.settings = settings;
  }

  public get locale(): Locale {
    return (this.settings.locales.locale);
  }

  public set locale(locale: Locale) {
    this.localeSubject.next(locale);
    const settings = this.settings;
    settings.locales.locale = locale;
    this.settings = settings;
  }


}
