import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { map } from 'rxjs/operators';

import { RecorderService } from '../recorder/recorder.service';
import { SettingsService } from '../../../settings/services';
import { WindowError } from '../exceptions';

const SCREEN_ID_SLICE_START = 7;
const SCREEN_ID_SLICE_END = -2;

@Injectable({
  providedIn: 'root',
})
export class WindowStateService {

  public readonly isExternalConnected = this.settings.externalDisplays.pipe(
    map(() => this.settings.screenConnection !== ''),
  );

  constructor(
    private readonly settings: SettingsService,
    private readonly recorder: RecorderService,
  ) {
  }

  public exit(): void {
    ipcRenderer.send('app-exit');
  }

  public checkExternalConnected(): void {
    this.settings.checkExternalConnections();
  }

  public async createExternalWindow(): Promise<void> {
    const source = await this.recorder.getCapturerSource();
    if (!source)
      throw new WindowError('Failed to create external window');

    const id = Number(
      source.id.slice(SCREEN_ID_SLICE_START, SCREEN_ID_SLICE_END),
    );
    await ipcRenderer.invoke('external-window', id);
  }

  public closeExternalWindow(): void {
    ipcRenderer.send('close-external-window');
  }
}
