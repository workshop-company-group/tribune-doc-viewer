import { Component } from '@angular/core';

import { BehaviorSubject, interval } from 'rxjs';

import {
  ConfirmationService,
  DocumentService,
  RecordBroadcastService,
} from '../../services';

@Component({
  selector: 'app-record-broadcast-control',
  templateUrl: './record-broadcast-control.component.html',
  styleUrls: ['./record-broadcast-control.component.scss'],
})
export class RecordBroadcastControlComponent {

  public wrapped = true;

  public readonly broadcastAvailability = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly confirmation: ConfirmationService,
    private readonly documentService: DocumentService,
    public readonly recordBroadcastService: RecordBroadcastService,
  ) {
    interval(500).subscribe(() =>
      this.recordBroadcastService.isBroadcastingAvailable().then(value =>
        this.broadcastAvailability.next(value)));
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
