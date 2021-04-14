import { Injectable } from '@angular/core';
import { ElectronService } from '../../../core/services';
import { Disk } from '../../models';

import * as fs from 'fs';
import * as drivelist from 'drivelist';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  fs: typeof fs;
  drivelist: typeof drivelist;

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.fs = window.require('fs');
      this.drivelist = window.require('drivelist');
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
    return await this.drivelist.list()
  }


}
