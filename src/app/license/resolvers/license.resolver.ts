import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { LicenseService } from '../services/license.service';

@Injectable({
  providedIn: 'root'
})
export class LicenseResolver implements Resolve<void> {

  constructor(
    private readonly license: LicenseService,
  ) { }

  public async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<void> {
    if (!await this.license.isLicenseKeySaved()) return;

    const key = await this.license.readLicenseFromFile();
    if (await this.license.isLicenseKeyValid(key)) {
      this.license.keySubject.next(key);
    } else {
      await this.license.removeKey();
    }
  }

}
