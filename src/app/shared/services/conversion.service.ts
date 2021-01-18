import { Injectable } from '@angular/core';
import { Document } from '../../models/document';
import * as path from 'path';
import * as childProcess from 'child_process';
import { ElectronService } from '../../core/services';

@Injectable({
  providedIn: 'root'
})

export class ConversionService {
  path: typeof path;
  childProcess: typeof childProcess;

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.path = window.require('path');
      this.childProcess = window.require('child_process');
    }
  }

  private getFileType(path: string): string {
    if (this.electron.isElectron) {
      return this.path.extname(path);
    }
  }

  public convertDocument(path: string): void {
    if (this.electron.isElectron) {
      this.childProcess.exec('pwd', (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
      })
    }
  }

}
