import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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

  public readonly recordingAvailability =
  interval(AVAILABILITY_CHECK_INTERVAL).pipe(
    map(() => this.recordBroadcast.isRecordingAvailable()),
  );

  public readonly recordControlState: Observable<recordControl> =
  this.recordBroadcast.state.pipe(
    map(state => !state || state === 'broadcasting'
      ? 'recordButton'
      : 'pauseStopControls'),
  );

  public readonly broadcastButtonIcon =
  this.recordBroadcast.state.pipe(
    map(state => state
      ? 'assets/icons/broadcast/broadcast-stop.svg'
      : 'assets/icons/broadcast/broadcast-blue.svg'),
  );

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private readonly confirmation: ConfirmationService,
    private readonly documentService: DocumentService,
    public readonly recordBroadcast: RecordBroadcastService,
  ) {
    this.subscriptions.push(
      interval(AVAILABILITY_CHECK_INTERVAL).subscribe(
        () => this.recordBroadcast.checkBroacastingAvailability(),
      ),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public pauseClickHandler(): void {
    if (this.recordBroadcast.state.value === 'recording') {
      this.recordBroadcast.pauseRecording();
    } else if (this.recordBroadcast.state.value === 'paused') {
      this.recordBroadcast.resumeRecording();
    }
  }

  public stopRecording(): void {
    this.recordBroadcast.stopRecording();
    this.confirmation.state = 'stop-recording';
  }

  public async broadcastClickHandler(): Promise<void> {
    if (this.recordBroadcast.state.value) {
      if (this.recordBroadcast.state.value !== 'broadcasting') {
        this.stopRecording();
      }
      this.recordBroadcast.stopBroadcasting();
      return;
    }

    if (this.documentService.opened.value.size === 1) {
      const doc = this.documentService.opened.value.get(0);
      if (doc) {
        await this.recordBroadcast.startBroadcasting(doc);
      }
    } else {
      this.confirmation.state = 'select-broadcasting';
    }
  }

}
