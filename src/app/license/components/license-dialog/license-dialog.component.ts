import { Component, } from '@angular/core';
import { FormControl, Validators, } from '@angular/forms';

import { WindowStateService, } from '../../../shared/services';
import { LicenseService, } from '../../services';

@Component({
  selector: 'app-license-dialog',
  templateUrl: './license-dialog.component.html',
  styleUrls: ['./license-dialog.component.scss']
})
export class LicenseDialogComponent {

  public readonly keyControl = new FormControl('', [
    Validators.required,
    Validators.minLength(25),
  ]);

  constructor(
    public readonly license: LicenseService,
    public readonly windowState: WindowStateService,
  ) { }

  public activate(): void {
    this.license.activate(this.keyControl.value);
  }

  public exit(): void {
    this.windowState.exit();
  }

}
