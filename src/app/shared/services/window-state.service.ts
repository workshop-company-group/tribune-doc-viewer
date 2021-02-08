import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame, remote } from 'electron';
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
}
