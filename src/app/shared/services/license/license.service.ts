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

  public async IsLicenseKeyValid(key: string): Promise<boolean> {
    const { status } = await fetch(`http://89.178.239.84:5555/api/license/validate?key=${key}`);
    if (status === 200)
      return true
    else if (status === 403)
      return false

    throw new LicenseError('Something went wrong');
  }

  public async Activate(key: string): Promise<boolean> {
    if (await this.IsLicenseKeyValid(key)) {
      return true;
    }
    return false;
  }
}
