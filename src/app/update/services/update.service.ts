import { Injectable } from '@angular/core';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private fs: typeof fs;
  public version: string;

  constructor() {
    this.fs = window.require('fs');
    const data = this.fs.readFileSync('version.json').toString('utf8');
    const json = JSON.parse(data);
    this.version = json.version;
  }

}
