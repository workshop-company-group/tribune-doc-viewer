import { Component, ChangeDetectionStrategy } from '@angular/core';

import { WindowStateService } from '../../../shared/services';

@Component({
  selector: 'app-network-confirmation',
  templateUrl: './network-confirmation.component.html',
  styleUrls: ['./network-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkConfirmationComponent {

  constructor(
    public readonly windowState: WindowStateService,
  ) { }

  public exit(): void {
    this.windowState.exit();
  }

}
