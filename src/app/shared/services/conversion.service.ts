import { Injectable } from '@angular/core';
import { Document } from '../../models/document';
import * as path from 'path';
import * as childProcess from 'child_process';
import * as util from 'util';
import { ElectronService } from '../../core/services';

const TEST = '/Users/minish144/Desktop/test.pptx';

@Injectable({
  providedIn: 'root'
})

export class ConversionService {
  path: typeof path;
  childProcess: typeof childProcess;
  util: typeof util;

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.path = window.require('path');
      this.childProcess = window.require('child_process');
      this.util = window.require('util');
    }
  }

  private getFileType(path: string): string {
    if (this.electron.isElectron) {
      return this.path.extname(path);
    }
  }

  private getFileDir(path: string): string {
    if (this.electron.isElectron) {
      return this.path.dirname(path);
    }
  }

  private getFileName(path: string, type: string = ''): string {
    if (this.electron.isElectron) {
      return this.path.basename(path, type);
    }
  }

  public async convertDocument(path: string, outputType: string = '.pdf'): Promise<Document> {
    if (this.electron.isElectron) {
      const type: string = this.getFileType(path);
      const dir: string = this.getFileDir(path);
      const name: string = this.getFileName(path, type);
      const newPath: string = dir + '/' + name + outputType;
      const execAsync = util.promisify(this.childProcess.exec);
      await execAsync(`soffice --headless --convert-to ${outputType.slice(1)} --outdir ${dir} ${path}`);
      return {
        originPath: path,
        convertedPath: newPath,
        title: name + outputType,
        length: 0
      }
    }
  }
}

