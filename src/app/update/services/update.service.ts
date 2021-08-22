import { Injectable } from '@angular/core';
import { remote } from 'electron';
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
    if (fs.existsSync(this.defaultPath)) {
      const json = jsonfile.readFileSync(this.defaultPath);
      this.version = json.version;
    } else {
      const versionJson = {
        version: "dev"
      }
      jsonfile.writeFileSync(this.defaultPath, versionJson);
      this.version = versionJson.version;
    }
  }
}
