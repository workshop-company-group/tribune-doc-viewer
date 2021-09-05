import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  ConfirmationService,
  DocumentService,
  RecordBroadcastService,
} from '../../services';

const AVAILABILITY_CHECK_INTERVAL = 500;
type recordControl = 'recordButton' | 'pauseStopControls';

@Component({
  selector: 'app-record-broadcast-control',
  templateUrl: './record-broadcast-control.component.html',
  styleUrls: ['./record-broadcast-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordBroadcastControlComponent implements OnDestroy {

  public readonly wrapped = new BehaviorSubject<boolean>(true);

  public readonly broadcastingAvailability =
  interval(AVAILABILITY_CHECK_INTERVAL).pipe(
    switchMap(() => this.recordBroadcastService.isBroadcastingAvailable()),
  );

  public readonly recordingAvailability =
  interval(AVAILABILITY_CHECK_INTERVAL).pipe(
    map(() => this.recordBroadcastService.isRecordingAvailable()),
  );

  public readonly recordControlState: Observable<recordControl> =
  this.recordBroadcastService.state.pipe(
    map(state => !state || state === 'broadcasting'
      ? 'recordButton'
      : 'pauseStopControls'),
  );

  public readonly broadcastButtonIcon =
  this.recordBroadcastService.state.pipe(
    map(state => state
      ? 'assets/icons/broadcast/broadcast-stop.svg'
      : 'assets/icons/broadcast/broadcast-blue.svg'),
  );

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private readonly confirmation: ConfirmationService,
    private readonly documentService: DocumentService,
    public readonly recordBroadcastService: RecordBroadcastService,
  ) { }

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

    if (this.documentService.opened.value.size === 1) {
      const doc = this.documentService.opened.value.get(0);
      if (doc) {
        await this.recordBroadcastService.startBroadcasting(doc);
      }
    } else {
      this.confirmation.state = 'select-broadcasting';
    }
  }

}
