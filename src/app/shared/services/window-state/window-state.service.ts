import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { RecorderService } from '../recorder/recorder.service';
import { SettingsService } from '../../../settings/services';

@Injectable({
  providedIn: 'root'
})
export class WindowStateService {
  ipcRenderer: typeof ipcRenderer;

  constructor(
    private readonly settings: SettingsService,
    private readonly recorder: RecorderService
  ) {
    this.ipcRenderer = window.require('electron').ipcRenderer;
  }

  public exit(): void {
    this.ipcRenderer.send('app-exit');
  }

  public async isExternalConnected(): Promise<boolean> {
    await this.settings.checkDisplay();
    return (this.settings.screenConnection !== '') ? true : false;
  }

  public async createExternalWindow(): Promise<void> {
    const source = await this.recorder.getCapturerSource();
    const id = Number(source.id.slice(7, -2));
    const result = await this.ipcRenderer.invoke('external-window', id);
  }

  public closeExternalWindow(): void {
    this.ipcRenderer.send('close-external-window');
  }
}
