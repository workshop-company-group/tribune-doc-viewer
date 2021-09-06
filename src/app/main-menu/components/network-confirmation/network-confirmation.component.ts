import { Component, ChangeDetectionStrategy } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { WindowStateService } from '../../../shared/services';

const CONNECTION_CHECK_TIMEOUT = 500;

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

  public readonly isConnecting = new BehaviorSubject<boolean>(false);

  public readonly retryButtonText = this.isConnecting.pipe(
    map(isConnecting => isConnecting ? 'connection-in-progress' : 'retry'),
  );

  private get isConnected(): boolean {
    return window.navigator.onLine;
  }

  public exit(): void {
    this.windowState.exit();
  }

  public checkConnection(): void {
    this.isConnecting.next(true);
    setTimeout(() => this.isConnecting.next(false), CONNECTION_CHECK_TIMEOUT);
  }

}
