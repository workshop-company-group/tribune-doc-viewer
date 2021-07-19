import { Injectable } from '@angular/core';

import * as fs from 'fs';
import * as path from 'path';
import * as childProcess from 'child_process';
import * as util from 'util';

import { Document } from '../models';
import { ElectronService } from '../../core/services';

const TEST = '/Users/minish144/Desktop/test.pptx';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  path: typeof path;
  fs: typeof fs;
  childProcess: typeof childProcess;
  util: typeof util;
  sofficeCommand: string;

  constructor(
    private readonly electron: ElectronService
  ) {
    this.path = window.require('path');
    this.fs = window.require('fs');
    this.childProcess = window.require('child_process');
    this.util = window.require('util');
    this.sofficeCommand = process.platform === 'win32' ? 'soffice' : 'libreoffice'
  }

  private getFileType(path: string): string {
    return this.path.extname(path);
  }

  private getFileDir(path: string): string {
    return this.path.dirname(path);
  }

  private getFileName(path: string, type: string = ''): string {
    return this.path.basename(path, type);
  }

  private fileRename(oldPath: string, newPath: string): void {
    this.fs.rename(oldPath, newPath, function(err) {
    });
  }

  public async convertDocument(path: string, outputType: string = 'pdf'): Promise<Document> {
    const execAsync = util.promisify(this.childProcess.exec);

    outputType = '.' + outputType.replace('.', '');
    path = path.replace("//", "/")

    const type: string = this.getFileType(path);
    const name: string = this.getFileName(path, type);
    const dir: string = this.getFileDir(path);

    const convertedPath: string = this.path.join(dir, name + outputType);
    const newConvertedPath: string = this.path.join(dir, name + Date.now().toString() + outputType);

    if (type === '.pdf') {
      await execAsync(`cp "${path}" "${newConvertedPath}"`);
      return {
        originPath: path,
        convertedPath: newConvertedPath,
        title: name,
      }
    }
    await execAsync(`${this.sofficeCommand} --headless --convert-to ${outputType.slice(1)} --outdir "${dir}" "${path}"`);
    this.fileRename(convertedPath, newConvertedPath);
    return {
      originPath: path,
      convertedPath: newConvertedPath,
      title: name,
    }
  }
}

