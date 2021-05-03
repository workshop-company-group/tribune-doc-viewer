import { Injectable } from '@angular/core';
import { ElectronService } from '../../../core/services';
import { Drive, FolderContent, Folder, FileInfo } from '../../models';
import { ipcRenderer } from 'electron';
import { FileSystemError } from '../exceptions'
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

  private getFileInfo(path: string): FileInfo {
    if (fs.existsSync(path)) {
      let stats = fs.statSync(path);
      const name = this.path.basename(path);
      const size = this.getFileSize(stats.size);
      const type = this.getFileType(path);

      return { name, size, type, path };
    } else {
      throw new FileSystemError('File was not found!');
    }
  };

  private getFileSize(size: number) {
    let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = 0;
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

  public async listDrives(): Promise<Drive[]> {
    const drives: Drive[] = await this.ipcRenderer.invoke('drive-list');
    const result: Drive[] = [];
    drives.forEach(drive => {
      try {
        if (drive.mountpoints.length > 0) {
          drive.size = this.getFileSize(drive.size as number);
          result.push(drive);
        }
      } catch (error) {
        throw new FileSystemError('Failed to get drives list');
      }
    });
    return result;
  }

  public getFolderContent(path: string): FolderContent {
    const resultObject: FolderContent = { folders: [], files: [] };

    let delimeter = '\\';
    if (process.platform !== 'win32')
      delimeter = '/';
    // if (path.substr(-1) === '/' || path.substr(-1) === '\\')
    //   path = path.slice(0, -1);

    const elements: string[] = this.fs.readdirSync(path);

    elements.forEach(element => {
      const elementPath = path + delimeter + element;

      if (fs.statSync(elementPath).isDirectory()) {
        let folderPath = ''
        if (process.platform === 'win32')
          folderPath = path + '\\' + element;
        else
          folderPath = path + '/' + element;

        const folder: Folder = { name: element, path: folderPath, access: this.ifFolderAccessible(folderPath) }
        resultObject.folders.push(folder);
      } else {
        resultObject.files.push(this.getFileInfo(elementPath));
      }
    });

    return resultObject;
  }

  private ifFolderAccessible(path: string): boolean {
    try {
      fs.accessSync(path, fs.constants.R_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  public dirExists(path: string): boolean {
    return this.fs.existsSync(path);
  }

  public dirAboveExists(path: string): boolean { // TEST
    const parent = this.getParentDir(path);
    return !(parent == '.' || parent == path);
  }

  public getParentDir(path: string): string {
    const dir = this.path.dirname(path);
    return dir;
  }
}
