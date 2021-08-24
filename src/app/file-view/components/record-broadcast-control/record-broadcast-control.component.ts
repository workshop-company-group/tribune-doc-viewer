import { Component, OnDestroy } from '@angular/core';

import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  ConfirmationService,
  DocumentService,
  RecordBroadcastService,
} from '../../services';

const BROADCASTING_AVAILABILITY_CHECK_INTERVAL = 500;

@Component({
  selector: 'app-record-broadcast-control',
  templateUrl: './record-broadcast-control.component.html',
  styleUrls: ['./record-broadcast-control.component.scss'],
})
export class RecordBroadcastControlComponent implements OnDestroy {

  public wrapped = true;

  public readonly broadcastAvailability = new BehaviorSubject<boolean>(false);

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private readonly confirmation: ConfirmationService,
    private readonly documentService: DocumentService,
    public readonly recordBroadcastService: RecordBroadcastService,
  ) {
    this.subscriptions.push(
      interval(BROADCASTING_AVAILABILITY_CHECK_INTERVAL).pipe(
        switchMap(() => this.recordBroadcastService.isBroadcastingAvailable()),
      ).subscribe(value => this.broadcastAvailability.next(value)),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public pauseClickHandler(): void {
    if (this.recordBroadcastService.state.value === 'recording') {
      this.recordBroadcastService.pauseRecording();
    } else if (this.recordBroadcastService.state.value === 'paused') {
      this.recordBroadcastService.resumeRecording();
    }
  }

  public stopRecording(): void {
    this.recordBroadcastService.stopRecording();
    this.confirmation.state = 'stop-recording';
  }

  public async broadcastClickHandler(): Promise<void> {
    if (this.recordBroadcastService.state.value) {
      if (this.recordBroadcastService.state.value !== 'broadcasting') {
        this.stopRecording();
      }
      this.recordBroadcastService.stopBroadcasting();
      return;
    }

    if (this.documentService.count === 1) {
      await this.recordBroadcastService.startBroadcasting(
        this.documentService.opened[0],
      );
    } else {
      this.confirmation.state = 'select-broadcasting';
    }
  }

}
