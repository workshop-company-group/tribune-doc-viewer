import { Injectable } from '@angular/core';
import { LicenseError } from '../exceptions';
import { ElectronService } from '../../../core/services';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  fs: typeof fs;

  constructor(private electron: ElectronService) {
    if (this.electron.isElectron) {
      this.fs = window.require('fs');
    }
  }

  private readonly defaultPath: string = 'license.key';

  private saveLicenseToFile(key: string): void {
    fs.writeFile(this.defaultPath, key, {flag: 'wx'}, function (err) {
      if (err) throw err;
    });
  }

  private readLicenseFromFile(): string {
    if (!this.fs.existsSync(this.defaultPath))
      throw new LicenseError('License file does not exist')
    return fs.readFileSync(this.defaultPath).toString();
  }

  public async isLicenseKeyValid(key: string): Promise<boolean> {
    const { status } = await fetch(`http://89.178.239.84:5555/api/licenses/${key}/validate`);
    if (status === 200)
      return true
    else if (status === 403)
      return false

    throw new LicenseError('Something went wrong');
  }

  public async activate(key: string): Promise<boolean> {
    if (await this.isLicenseKeyValid(key)) {
      await fetch(
        `http://89.178.239.84:5555/api/licenses/${key}?is_provided=true&is_activated=true`, {
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

  public isLicenseKeySaved(): boolean {
    try {
      const savedKey = this.readLicenseFromFile();
      if (savedKey.length > 0)
        return true;
      else
        return false;
    } catch (error) {
      return false;
    }
  }

  public async isSavedKeyValid(): Promise<boolean> {
    try {
      const savedKey = this.readLicenseFromFile();
      if (savedKey.length > 0)
        return await this.isLicenseKeyValid(savedKey);
      else
        return false;
    } catch (error) {
      return false;
    }
  }
}
