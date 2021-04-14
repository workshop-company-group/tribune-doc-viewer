import { Injectable } from '@angular/core';
import { ElectronService } from '../../../core/services';
import { Disk, FolderContent } from '../../models';

import * as fs from 'fs';
import * as drivelist from 'drivelist';
import * as fileInfo from 'get-file-info';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  fs: typeof fs;
  drivelist: typeof drivelist;
  fileInfo: typeof fileInfo;

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.fs = window.require('fs');
      this.drivelist = window.require('drivelist');
      this.fileInfo = window.require('get-file-info')
    }
  }

  public async removeFile(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.fs.unlink(path, (err) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve();
        }
      })
    });
  }

  public async listDisks(): Promise<Disk[]> {
    return await drivelist.list()
  }

  public getFolderContent(path: string): FolderContent {
    const resultObject: FolderContent = { folders: [], files: [] };

    let delimeter = '\\';
    if (process.platform !== 'win32')
      delimeter = '/';
    if (path.substr(-1) === '/' || path.substr(-1) === '\\')
      path = path.slice(0, -1);

    const elements: string[] = this.fs.readdirSync(path);
    elements.forEach(element => {
      const elementPath = path + delimeter + element;
      if (fs.lstatSync(elementPath).isDirectory())
        resultObject.folders.push(element);
      else
        resultObject.folders.push(this.fileInfo.get(elementPath));
    });

    return resultObject;
  }
}
