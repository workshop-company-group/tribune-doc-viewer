import { Injectable } from '@angular/core';
import { LicenseError } from '../exceptions';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  constructor() { }

  public async IsLicenseKeyValid(key: string): Promise<boolean> {
    const { status } = await fetch(`http://89.178.239.84:5555/api/license/validate?key=${key}`);
    if (status === 200)
      return true
    else if (status === 403)
      return false
    else
      throw new LicenseError('Invalid license key provided');
  }
}
