import { Injectable } from '@angular/core';

import * as fs from 'fs';
import * as path from 'path';
import * as childProcess from 'child_process';
import * as util from 'util';
import { ElectronService } from '../../../core/services';

import { Document } from '../models';

const TEST = '/Users/minish144/Desktop/test.pptx';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  path: typeof path;
  fs: typeof fs;
  childProcess: typeof childProcess;
  util: typeof util;

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.path = window.require('path');
      this.fs = window.require('fs');
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

  private fileRename(oldPath: string, newPath: string): void {
    if (this.electron.isElectron) {
      this.fs.rename(oldPath, newPath, function(err) {
        if (err) console.error('ERROR: ' + err);
      });
    }
  }

  public async convertDocument(path: string, outputType: string = 'pdf'): Promise<Document> {
    outputType = '.' + outputType;
    if (this.electron.isElectron) {
      const type: string = this.getFileType(path);
      const dir: string = this.getFileDir(path);
      const name: string = this.getFileName(path, type);
      const convertedPath: string = dir + '/' + name + outputType;
      const newConvertedPath: string = dir + '/' + name + Date.now().toString() + outputType;
      const execAsync = util.promisify(this.childProcess.exec);
      await execAsync(`soffice --headless --convert-to ${outputType.slice(1)} --outdir ${dir} ${path.replace(' ', '\\ ')}`);
      this.fileRename(convertedPath, newConvertedPath);
      return {
        originPath: path,
        convertedPath: newConvertedPath,
        title: name,
        length: 0
      }
    }
  }
}

