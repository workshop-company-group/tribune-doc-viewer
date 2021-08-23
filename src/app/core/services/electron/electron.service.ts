/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
// should not edit something here because it's core electron service

import { Injectable } from '@angular/core';

// If you import a module but never use any of
// the imported values other than as TypeScript types,
// the resulting javascript file will look as
// if you never imported the module at all.

import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = ipcRenderer;
      this.webFrame = webFrame;
      this.remote = remote;
      this.childProcess = childProcess;
      this.fs = fs;
    }
  }
}
