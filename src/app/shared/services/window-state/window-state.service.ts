import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { ElectronService } from '../../../core/services';
import { RecorderService } from '../recorder/recorder.service';
import { SettingsService } from '../../../settings/services';

@Injectable({
  providedIn: 'root'
})
export class WindowStateService {
  ipcRenderer: typeof ipcRenderer;

  constructor(
    private readonly electron: ElectronService,
    private readonly settings: SettingsService,
    private readonly recorder: RecorderService
  ) {
    if (this.electron.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }
  }

  public exit(): void {
    if (this.electron.isElectron) {
      this.ipcRenderer.send('app-exit');
    }
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
    if (this.electron.isElectron) {
      this.ipcRenderer.send('close-external-window');
    }
  }
}
