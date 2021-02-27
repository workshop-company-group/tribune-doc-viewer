import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { BehaviorSubject, interval } from 'rxjs';

import { RecordBroadcastService } from '../../services';
import { DocumentService } from '../../services';

@Component({
  selector: 'app-record-broadcast-control',
  templateUrl: './record-broadcast-control.component.html',
  styleUrls: ['./record-broadcast-control.component.scss']
})
export class RecordBroadcastControlComponent implements OnInit {

  @Output('choice-request')
  public choiceRequestEmitter = new EventEmitter<void>();

  public wrapped: boolean = false;

  public readonly broadcastAvailability = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly documentService: DocumentService,
    public readonly recordBroadcastService: RecordBroadcastService,
  ) {
    interval(500).subscribe(() =>
      this.recordBroadcastService.isBroadcastingAvailable().then((value) =>
        this.broadcastAvailability.next(value)));
  }

  ngOnInit(): void {
  }

  public pauseClickHandler(): void {
    if (this.recordBroadcastService.docState === 'recording') {
      this.recordBroadcastService.pauseRecording();
    } else if (this.recordBroadcastService.docState === 'paused') {
      this.recordBroadcastService.continueRecording();
    }
  }

  public async broadcastClickHandler(): Promise<void> {
    if (this.recordBroadcastService.docState !== null) {
      this.recordBroadcastService.stopRecording();
      this.recordBroadcastService.stopBroadcasting();
      return;
    }

    if (this.documentService.count === 1) {
      await this.recordBroadcastService.startBroadcasting(this.documentService.opened[0]);
    } else {
      this.choiceRequestEmitter.emit();
    }
  }

}
