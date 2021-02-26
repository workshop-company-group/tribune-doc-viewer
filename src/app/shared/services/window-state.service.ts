import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { ElectronService } from '../../core/services';
import { WindowError } from '../services/exceptions/window-error';

@Injectable({
  providedIn: 'root'
})
export class WindowStateService {
  ipcRenderer: typeof ipcRenderer;

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.createExternalWindow();
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

  public createExternalWindow(): void {
    if (this.electron.isElectron) {
      console.log('called new window!');
      this.ipcRenderer.send('external-window');
    }
  }

  public closeExternalWindow(): void {
    if (this.electron.isElectron) {
      console.log('closed external window!');
      this.ipcRenderer.send('close-external-window');
    }
  }
}
