import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame, remote } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class WindowStateService {
  ipcRenderer: typeof ipcRenderer;

  constructor() {
    this.ipcRenderer = window.require('electron').ipcRenderer;
  }

  public exit(): void {
    this.ipcRenderer.send('app-exit');
  }
}
