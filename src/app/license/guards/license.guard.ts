import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,
  Router, RouterStateSnapshot, } from '@angular/router';

import { LicenseService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class LicenseGuard implements CanActivate {

  constructor(
    private readonly license: LicenseService,
    private readonly router: Router,
  ) {}

  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (await this.license.keySubject.value) {
      return true;
    } else {
      await this.router.navigateByUrl('/main-menu');
      return false;
    }
  }

}
