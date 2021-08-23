import { Injectable } from '@angular/core';
import packageInfo from '../../../../package.json';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  public version: string;

  constructor() {
    if (packageInfo.version) {
      this.version = packageInfo.version;
    } else {
      this.version = 'dev';
    }
  }
}
