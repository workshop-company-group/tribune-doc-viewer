import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { ElectronService } from '../../core/services';

@Injectable({
  providedIn: 'root'
})
export class WindowStateService {
  ipcRenderer: typeof ipcRenderer;

  constructor(private electron: ElectronService) {
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
    const result: boolean = await this.ipcRenderer.invoke('is-external-connected');
    return result;
  }

  public async createExternalWindow(): Promise<void> {
    console.log('called new window!');
    const result = await this.ipcRenderer.invoke('external-window');
    console.log(result);
  }

  public closeExternalWindow(): void {
    if (this.electron.isElectron) {
      console.log('closed external window!');
      this.ipcRenderer.send('close-external-window');
    }
  }
}
