import { Injectable } from '@angular/core';
import { ElectronService } from '../../../core/services';
import { Drive, FolderContent } from '../../models';
import { ipcRenderer } from 'electron';
import * as fs from 'fs';

// import * as drivelist from 'drivelist';
// import * as fileInfo from 'get-file-info';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  fs: typeof fs;
  ipcRenderer: typeof ipcRenderer;
  // fileInfo: typeof fileInfo;

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.fs = window.require('fs');
      this.ipcRenderer = window.require('electron').ipcRenderer;
      // this.fileInfo = window.require('get-file-info')
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

  public async listDisks(): Promise<Drive[]> {
    return await this.ipcRenderer.invoke('drive-list');
  }

  // public getFolderContent(path: string): FolderContent {
  //   const resultObject: FolderContent = { folders: [], files: [] };

  //   let delimeter = '\\';
  //   if (process.platform !== 'win32')
  //     delimeter = '/';
  //   if (path.substr(-1) === '/' || path.substr(-1) === '\\')
  //     path = path.slice(0, -1);

  //   const elements: string[] = this.fs.readdirSync(path);
  //   elements.forEach(element => {
  //     const elementPath = path + delimeter + element;
  //     if (fs.lstatSync(elementPath).isDirectory())
  //       resultObject.folders.push(element);
  //     else
  //       resultObject.folders.push(this.fileInfo.get(elementPath));
  //   });

  //   return resultObject;
  // }
}
