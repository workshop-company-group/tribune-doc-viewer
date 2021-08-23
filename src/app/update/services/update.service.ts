import { Injectable } from '@angular/core';
import { remote } from 'electron';
import { version } from '../../../../package.json';

const { app } = remote;

import * as fs from 'fs';
import * as path from 'path';
import * as jsonfile from 'jsonfile'

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  public version: string;

  private readonly defaultPath: string = path.join(app.getPath('userData'), 'config.json');

  constructor() {
    if (version) {
      this.version = version;
    } else {
      const versionJson = {
        version: "dev"
      }
      this.version = versionJson.version;
    }
  }
}
