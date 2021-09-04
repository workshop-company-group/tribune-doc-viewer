import { Injectable } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';
import { RecordOf } from 'immutable';

import { ExternalViewerService,
  RecorderService,
  WindowStateService } from '../../shared/services';
import { OpenedDocument, RecordBroadcastState } from '../models';
import { BroadcastError } from './broadcast-error';

@Injectable({
  providedIn: 'root',
})
export class RecordBroadcastService {

  private doc?: RecordOf<OpenedDocument>;

  public state = new BehaviorSubject<RecordBroadcastState>(null);

  private docSubscription: {
    state: Subscription | undefined;
    page: Subscription | undefined;
  } = {
    state: undefined,
    page: undefined,
  };

  constructor(
    private readonly external: ExternalViewerService,
    private readonly recorder: RecorderService,
    private readonly windowStateService: WindowStateService,
  ) { }

  public resumeRecording(): void {
    if (!this.doc) {
      throw new Error('Error: Failed to resume recording. Document is unavailable.');
    }

    this.recorder.continue();
    this.doc.recordBroadcastState.next('recording');
  }

  public async isBroadcastingAvailable(): Promise<boolean> {
    return this.windowStateService.isExternalConnected();
  }

  public isRecordingAvailable(): boolean {
    return this.doc !== undefined;
  }

  public pauseRecording(): void {
    if (!this.doc) {
      throw new Error('Error: Failed to pause recording. Document is unavailable.');
    }

    this.recorder.pause();
    this.doc.recordBroadcastState.next('paused');
  }

  public async startBroadcasting(doc: RecordOf<OpenedDocument>): Promise<void> {
    if (!(await this.isBroadcastingAvailable())) {
      throw new BroadcastError('broadcasting is not available');
    }
    this.doc = doc;
    await this.windowStateService.createExternalWindow();
    this.external.setPdf(this.doc.doc.convertedPath);
    this.docSubscription.page = this.doc.currentPage.subscribe(page =>
      this.external.setPage(page + 1));
    this.docSubscription.state =
      this.doc.recordBroadcastState.subscribe(this.state);
    this.doc.recordBroadcastState.next('broadcasting');
  }

  public async startRecording(): Promise<void> {
    if (!this.doc) {
      throw new Error('Error: Failed to start recording. Document is unavailable.');
    }

    await this.recorder.setExternalMonitor();
    this.recorder.start();

    this.doc.recordBroadcastState.next('recording');
  }

  public stopBroadcasting(): void {
    if (!this.doc) {
      throw new Error('Error: Failed to stop broadcasting. Document is unavailable.');
    }
    this.windowStateService.closeExternalWindow();

    this.doc.recordBroadcastState.next(null);
    this.doc = undefined;
    this.docSubscription.state?.unsubscribe();
    this.docSubscription.page?.unsubscribe();
  }

  public stopRecording(): void {
    if (!this.doc) {
      throw new Error('Error: Failed to stop recording. Document is unavailable.');
    }
    this.recorder.stop(`${this.doc.doc.convertedPath}.webm`);
    this.doc.recordBroadcastState.next('broadcasting');
  }

}
