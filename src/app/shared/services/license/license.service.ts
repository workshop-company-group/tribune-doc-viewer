import { Injectable } from '@angular/core';
import { LicenseError } from '../exceptions';
import { ElectronService } from '../../../core/services';
import { ServerAddress } from '../../../../server-settings';

import * as fs from 'fs';
import * as util from 'util';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  fs: typeof fs;
  util: typeof util;

  private readonly defaultPath: string = 'license.key';

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.fs = window.require('fs');
      this.util = window.require('util');
    }
  }

  private saveLicenseToFile(key: string): void {
    this.fs.writeFile(this.defaultPath, key, {flag: 'wx'}, function (err) {
      if (err) throw err;
    });
  }

  private async readLicenseFromFile(): Promise<string> {
    const existsAsync = util.promisify(this.fs.exists);
    const readFileAsync = util.promisify(this.fs.readFile);

    if (!(await existsAsync(this.defaultPath)))
      throw new LicenseError('License file does not exist')
    return (await readFileAsync(this.defaultPath)).toString();
  }

  public async isLicenseKeyValid(key: string): Promise<boolean> {
    const { status } = await fetch(`http://${ServerAddress}/api/licenses/${key}/validate`);
    if (status === 200)
      return true
    else if (status === 403)
      return false
    else
      throw new LicenseError('Something went wrong');
  }

  public async activate(key: string): Promise<boolean> {
    if (await this.isLicenseKeyValid(key)) {
      await fetch(
        `http://${ServerAddress}/api/licenses/${key}?is_provided=true&is_activated=true`, {
        method: 'PATCH',
        headers: {
          'accept': 'application/json; charset=UTF-8'
        }
      });
      this.saveLicenseToFile(key);
      return true;
    }
    return false;
  }

  public async isLicenseKeySaved(): Promise<boolean> {
    try {
      const savedKey = await this.readLicenseFromFile();
      return savedKey.length > 0;
    } catch (error) {
      return false;
    }
  }

  public async isSavedLicenseKeyValid(): Promise<boolean> {
    const savedKey = await this.readLicenseFromFile();
    if (savedKey.length > 0)
      return await this.isLicenseKeyValid(savedKey);
    else
      return false;
  }
}
