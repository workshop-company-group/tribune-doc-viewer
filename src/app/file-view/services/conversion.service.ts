import { Injectable } from '@angular/core';
import { ConversionError } from './conversion-error';

import * as fs from 'fs';
import * as jspath from 'path';
import * as childProcess from 'child_process';
import * as util from 'util';

import { Document } from '../models';
import { ElectronService } from '../../core/services';

@Injectable({
  providedIn: 'root',
})
export class ConversionService {
  private readonly sofficeCommand = process.platform === 'win32' ? '"C:\\Program Files\\LibreOffice\\program\\soffice"' : 'soffice';

  constructor(
    private readonly electron: ElectronService,
  ) {}

  private getFileType(path: string): string {
    return jspath.extname(path);
  }

  private getFileDir(path: string): string {
    return jspath.dirname(path);
  }

  private getFileName(path: string, type = ''): string {
    return jspath.basename(path, type);
  }

  private fileRename(oldPath: string, newPath: string): void {
    fs.rename(oldPath, newPath, function(err) {
      if (err)
        throw new ConversionError('Failed to rename file');
    });
  }

  public async convertDocument(path: string, _outputType = 'pdf'): Promise<Document> {
    const execAsync = util.promisify(childProcess.exec);

    const outputType = `.${_outputType.replace('.', '')}`;

    const type: string = this.getFileType(path);
    const name: string = this.getFileName(path, type);
    const dir: string = this.getFileDir(path);

    const convertedPath: string =
      jspath.join(dir, name + outputType);
    const newConvertedPath: string =
      jspath.join(dir, name + Date.now().toString() + outputType);

    if (type === '.pdf') {
      fs.copyFileSync(path, newConvertedPath)
      return {
        originPath: path,
        convertedPath: newConvertedPath,
        title: name,
      };
    }

    await execAsync(
      `${this.sofficeCommand} --headless ` +
      `--convert-to ${outputType.slice(1)} ` +
      `--outdir "${dir}" "${path}"`
    );

    this.fileRename(convertedPath, newConvertedPath);

    return {
      originPath: path,
      convertedPath: newConvertedPath,
      title: name,
    };
  }
}

