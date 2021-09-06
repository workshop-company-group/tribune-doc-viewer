import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { filter, take } from 'rxjs/operators';

import { LicenseService } from '../services/license.service';
import { NetworkService } from '../../network/services';

@Injectable({
  providedIn: 'root',
})
export class LicenseResolver implements Resolve<void> {

  constructor(
    private readonly license: LicenseService,
    private readonly network: NetworkService,
  ) { }

  public async resolve(): Promise<void> {
    if (!await this.license.isLicenseKeySaved()) return;

    const key = await this.license.readLicenseFromFile();

    let isKeyValid;
    try {
      isKeyValid = await this.license.isLicenseKeyValid(key);
    } catch (error) {
      if (!this.network.connection.value) {
        // retry after connecting
        this.network.connection.pipe(
          filter(connection => connection),
          take(1),
        ).subscribe(() => void this.resolve());
        return;
      }
      throw error;
    }

    if (isKeyValid) {
      this.license.keySubject.next(key);
    } else {
      await this.license.removeKey();
    }
  }

}
