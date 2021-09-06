import {
  OnInit,
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';

import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

import { WindowStateService } from '../../../shared/services';
import { NetworkService } from '../../services';

const CONNECTION_CHECK_TIMEOUT = 500;
const RETRY_TIMER_TIMEOUT = 20000;
const RETRY_TIMER_PERIOD = 1000;

@Component({
  selector: 'app-network-confirmation',
  templateUrl: './network-confirmation.component.html',
  styleUrls: ['./network-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkConfirmationComponent implements OnInit, OnDestroy {

  constructor(
    public readonly network: NetworkService,
    public readonly windowState: WindowStateService,
  ) { }

  public ngOnInit(): void {
    this.setTimer(RETRY_TIMER_TIMEOUT);
  }

  public ngOnDestroy(): void {
    this.unsubscribeTimer();
  }

  public readonly isConnecting = new BehaviorSubject<boolean>(false);

  public readonly retryButtonText = this.isConnecting.pipe(
    map(isConnecting => isConnecting ? 'connection-in-progress' : 'retry'),
  );


  // #region Timer

  public retryTimer: Observable<number>;

  private timerSubscription?: Subscription;

  private setTimer(timeout: number): void {
    this.unsubscribeTimer();
    this.retryTimer = interval(RETRY_TIMER_PERIOD).pipe(
      map(value => value + 1), // start from 1 because of immediate start
      startWith(0), // immediate start
      map(value => timeout - value * RETRY_TIMER_PERIOD),
      map(ms => ms / RETRY_TIMER_PERIOD),
    );

    this.timerSubscription = this.retryTimer.pipe(
      filter(seconds => !seconds),
    ).subscribe(() => {
      this.checkConnection();
      this.unsubscribeTimer();
    });
  }

  private unsubscribeTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  // #endregion


  public exit(): void {
    this.windowState.exit();
  }

  public checkConnection(): void {
    this.isConnecting.next(true);
    setTimeout(() => {
      this.network.updateConnection();
      this.setTimer(RETRY_TIMER_TIMEOUT);
      this.isConnecting.next(false);
    }, CONNECTION_CHECK_TIMEOUT);
  }

}
