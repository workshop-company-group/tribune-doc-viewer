import { Injectable } from '@angular/core';
import { ElectronService } from '../../../core/services';
import { Drive, FolderContent, File } from '../../models';
import { ipcRenderer } from 'electron';
import * as fs from 'fs';
import * as path from 'path';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  fs: typeof fs;
  path: typeof path;
  ipcRenderer: typeof ipcRenderer;

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.fs = window.require('fs');
      this.path = window.require('path');
      this.ipcRenderer = window.require('electron').ipcRenderer;
    }
  }

  private getFileType(path: string): string {
    const index = path.lastIndexOf('.');
    return path.slice(index+1);
  }

  private fileInfo(path: string): File {
    if (fs.existsSync(path)) {
      var stats = fs.statSync(path);
      const name = this.path.basename(path);
      const size = this.fileSize(stats.size);
      const type = this.getFileType(path);
      return { name, size, type };
    } else {
      return { name: '', size: '', type: '' };
    }
  };

  private fileSize(size: number) {
    var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = 0;
    while(size >= 1024) {
        size /= 1024;
        ++i;
    }
    return size.toFixed(1) + ' ' + units[i];
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
    const res: Drive[] = await this.ipcRenderer.invoke('drive-list');
    res.forEach(element => {
      try {
        element.size = this.fileSize(element.size as number);
      } catch (error) {}
    });
    return res;
  }

  public getFolderContent(path: string): FolderContent {
    const resultObject: FolderContent = { folders: [], files: [] };

    let delimeter = '\\';
    if (process.platform !== 'win32')
      delimeter = '/';
    if (path.substr(-1) === '/' || path.substr(-1) === '\\')
      path = path.slice(0, -1);

    const elements: string[] = this.fs.readdirSync(path);
    console.log(elements);
    elements.forEach(element => {
      const elementPath = path + delimeter + element;
      console.log('Element: ', elementPath, 'isDir?: ', fs.statSync(elementPath).isDirectory());
      if (fs.statSync(elementPath).isDirectory())
        resultObject.folders.push(element);
      else
        resultObject.files.push(this.fileInfo(elementPath));
    });

    return resultObject;
  }
}
