import { Injectable } from '@angular/core';
import * as fs from 'fs';
import { ElectronService } from '../../core/services';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private fs: typeof fs;
  public version: string;

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.fs = window.require('fs');
      const data = this.fs.readFileSync('config.json').toString('utf8');
      const json = JSON.parse(data);
      this.version = json.version;
    }
  }

}
