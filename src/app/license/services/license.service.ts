import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LicenseError } from '../exceptions';
import { AppConfig } from '../../../environments/environment';

import { ElectronService } from '../../core/services';
import { LicenseApiService } from './license-api.service';

import * as fs from 'fs';
import * as util from 'util';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  fs: typeof fs;
  util: typeof util;
  serverAddress: string;
  private readonly defaultPath: string = 'license.key';

  constructor(
    private readonly api: LicenseApiService,
    private readonly electron: ElectronService,
  ) {
    if (this.electron.isElectron) {
      this.fs = window.require('fs');
      this.util = window.require('util');

      this.serverAddress = AppConfig.serverOrigin;
    }
  }

  private saveLicenseToFile(key: string): void {
    this.fs.writeFile(this.defaultPath, key, {flag: 'wx'}, function (err) {
      if (err) throw err;
    });
  }

  private async readLicenseFromFile(): Promise<string> {
    const existsAsync = this.util.promisify(this.fs.exists);
    const readFileAsync = this.util.promisify(this.fs.readFile);

    if (!(await existsAsync(this.defaultPath)))
      throw new LicenseError('License file does not exist')
    return (await readFileAsync(this.defaultPath)).toString();
  }

  public async isLicenseKeyValid(key: string): Promise<boolean> {
    try {
      await this.api.validate(key);
    } catch(err) {
      if (err.status === 403)
        return false;
      else
        throw new LicenseError('Something went wrong');
    }
    return true;
  }

  public async activate(key: string): Promise<boolean> {
    if (await this.isLicenseKeyValid(key)) {
      await this.api.activate(key);
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
    return false;
  }
}
