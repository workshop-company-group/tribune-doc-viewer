import { Injectable } from '@angular/core';
import { remote } from 'electron';
const { app } = remote;

import * as fs from 'fs';
import * as path from 'path';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  public version: string;

  private readonly defaultPath: string = path.join(app.getPath('userData'), 'config.json');

  constructor() {
    if (fs.existsSync(this.defaultPath)) {
      const data = fs.readFileSync(this.defaultPath).toString('utf8');
      const json = JSON.parse(data);
      this.version = json.version;
    } else {
      const versionJson = {
        version: "dev"
      }
      fs.writeFileSync(this.defaultPath, versionJson.toString());
      this.version = versionJson.version;
    }
  }
}
