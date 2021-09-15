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

const INTERNAL_DISPLAYS = 3;
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

  private readonly displayCheckWorker = new Worker(
    new URL('../web-workers/display-check.worker', import.meta.url),
    { type: 'module' },
  );

  public readonly externalDisplays = new BehaviorSubject<Display[]>([]);

  constructor(
    private readonly system: SystemService,
  ) {
    this.displayCheckWorker.onmessage = (message: MessageEvent) => {
      const displays = JSON.parse(message.data);
      const externalDisplays = this.filterExternalDisplays(displays);
      // Should be called before emitting value to displays
      this.setExternalDisplay(externalDisplays);
      this.externalDisplays.next(externalDisplays)
    };

    this.initIni();
    this.checkExternalConnections();
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

  /**
   * Sends emit to worker that returns array of connected displays.
   */
  public checkExternalConnections(): void {
    this.displayCheckWorker.postMessage('');
  }

  /**
   * Checks if set display is in connected displays and resets if not.
   *
   * @param displays Connected displays.
   */
  private setExternalDisplay(displays: Display[]): void {
    if (this.screenConnection !== '')
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

  private filterExternalDisplays(displays: Display[]): Display[] {
    if (displays.length < INTERNAL_DISPLAYS)
      return [];
    return displays.slice(INTERNAL_DISPLAYS - 1);
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
