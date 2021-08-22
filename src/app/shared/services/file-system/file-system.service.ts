import { Injectable } from '@angular/core';
import { Drive, FolderContent, Folder, FileInfo } from '../../models';
import { ipcRenderer } from 'electron';
import { FileSystemError } from '../exceptions'
import * as fs from 'fs';
import * as jspath from 'path';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  ipcRenderer: typeof ipcRenderer;

  constructor() {
    this.ipcRenderer = window.require('electron').ipcRenderer;
  }

  private getFileType(path: string): string {
    const index = path.lastIndexOf('.');
    return path.slice(index+1);
  }

  private getFileInfo(path: string): FileInfo {
    if (fs.existsSync(path)) {
      let stats = fs.statSync(path);
      let name = jspath.basename(path);
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
      fs.unlink(path, (err) => {
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
    const elements: string[] = fs.readdirSync(path);
    elements.forEach(element => {
      const elementPath = jspath.join(path, element);
      let isDirectory = false
      try { isDirectory = fs.statSync(elementPath).isDirectory() } catch (error) {}
      if (isDirectory) {
        let folderPath = jspath.join(path, element);
        const folder: Folder = { name: element, path: folderPath, access: this.ifFolderAccessible(folderPath) }
        resultObject.folders.push(folder);
      } else {
        try { resultObject.files.push(this.getFileInfo(elementPath)); } catch (error) {}
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
    return fs.existsSync(path);
  }

  public dirAboveExists(path: string): boolean {
    const parent = this.getParentDir(path);
    return !(parent == '.' || parent == path);
  }

  public getParentDir(path: string): string {
    const dir = jspath.dirname(path);
    return dir;
  }
}
