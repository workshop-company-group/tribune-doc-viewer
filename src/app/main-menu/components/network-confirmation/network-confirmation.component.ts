import { Component, ChangeDetectionStrategy } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { WindowStateService } from '../../../shared/services';

@Component({
  selector: 'app-network-confirmation',
  templateUrl: './network-confirmation.component.html',
  styleUrls: ['./network-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkConfirmationComponent {

  public readonly isConnecting = new BehaviorSubject<boolean>(true);

  public readonly retryButtonText = this.isConnecting.pipe(
    map(isConnecting => isConnecting ? 'connection-in-progress' : 'retry'),
  );

  constructor(
    public readonly windowState: WindowStateService,
  ) { }

  public exit(): void {
    this.windowState.exit();
  }

}
