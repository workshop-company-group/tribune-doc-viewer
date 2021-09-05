import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,
  Router, RouterStateSnapshot } from '@angular/router';

import { LicenseService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class LicenseGuard implements CanActivate {

  constructor(
    private readonly license: LicenseService,
    private readonly router: Router,
  ) {}

  public async canActivate(
    // Angular interface CanActivate syntax
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot,
    // Angular interface CanActivate syntax
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    if (this.license.keySubject.value) {
      return true;
    }
    await this.router.navigateByUrl('/main-menu');
    return false;
  }
}
