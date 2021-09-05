import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { LicenseError } from '../exceptions';

import { LicenseApiService } from './license-api.service';
import { LicenseApiResponseStatus } from '../models';
import { remote } from 'electron';
const { app } = remote;

import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

export const KEY_LENGTH = 25;

@Injectable({
  providedIn: 'root',
})
export class LicenseService {
  public readonly keySubject = new BehaviorSubject<string | null>(null);

  private readonly defaultPath: string = path.join(app.getPath('userData'), 'license.key');

  constructor(
    private readonly api: LicenseApiService,
  ) {}

  private async saveKey(key: string): Promise<void> {
    const writeFileAsync = util.promisify(fs.writeFile);

    this.keySubject.next(key); // save key to RAM
    await writeFileAsync(this.defaultPath, key, { flag: 'wx' });
  }

  public async removeKey(): Promise<void> {
    const unlinkAsync = util.promisify(fs.unlink);

    this.keySubject.next(null);
    await unlinkAsync(this.defaultPath);
  }

  public async readLicenseFromFile(): Promise<string> {
    const existsAsync = util.promisify(fs.exists);
    const readFileAsync = util.promisify(fs.readFile);

    if (!(await existsAsync(this.defaultPath)))
      throw new LicenseError('License file does not exist');
    return (await readFileAsync(this.defaultPath)).toString();
  }

  public async isLicenseKeyValid(key: string): Promise<boolean> {
    try {
      const validationResult = await this.api.validate(key);
      return validationResult.status === LicenseApiResponseStatus.OK;
    } catch (err) {
      throw new LicenseError('Something went wrong');
    }
    return true;
  }

  public async activate(key: string): Promise<boolean> {
    if (await this.isLicenseKeyValid(key)) {
      await this.api.activate(key);
      await this.saveKey(key);
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
      return this.isLicenseKeyValid(savedKey);
    return false;
  }
}
