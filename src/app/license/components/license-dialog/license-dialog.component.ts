import { Component, } from '@angular/core';

import { WindowStateService, } from '../../../shared/services';

@Component({
  selector: 'app-license-dialog',
  templateUrl: './license-dialog.component.html',
  styleUrls: ['./license-dialog.component.scss']
})
export class LicenseDialogComponent {

  constructor(
    public readonly windowState: WindowStateService,
  ) { }

  public activate(): void {

  }

  public exit(): void {
    this.windowState.exit();
  }

}
