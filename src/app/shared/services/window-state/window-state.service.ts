import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { RecorderService } from '../recorder/recorder.service';
import { SettingsService } from '../../../settings/services';
import { WindowError } from '../exceptions';

@Injectable({
  providedIn: 'root'
})
export class WindowStateService {
  constructor(
    private readonly settings: SettingsService,
    private readonly recorder: RecorderService
  ) {}

  public exit(): void {
    ipcRenderer.send('app-exit');
  }

  public async isExternalConnected(): Promise<boolean> {
    await this.settings.checkDisplay();
    return this.settings.screenConnection !== '';
  }

  public async createExternalWindow(): Promise<void> {
    const source = await this.recorder.getCapturerSource();
    if (!source)
      throw new WindowError('Failed to create external window')

    const id = Number(source.id.slice(7, -2));
    await ipcRenderer.invoke('external-window', id);
  }

  public closeExternalWindow(): void {
    ipcRenderer.send('close-external-window');
  }
}
