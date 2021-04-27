import { Injectable } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import { ExternalViewerService,
         RecorderService,
         WindowStateService, } from '../../../shared/services';
import { OpenedDocument, RecordBroadcastState } from '../models';


@Injectable({
  providedIn: 'root'
})
export class RecordBroadcastService {

  private doc: OpenedDocument = null;

  public state = new BehaviorSubject<RecordBroadcastState>(null);

  private docSubscription: {
    state: Subscription,
    page: Subscription
  } = {
    state: null,
    page: null
  };

  constructor(
    private readonly external: ExternalViewerService,
    private readonly recorder: RecorderService,
    private readonly windowStateService: WindowStateService,
  ) { }

  public resumeRecording(): void {
    this.recorder.continue();
    this.doc.recordBroadcastState.next('recording');
  }

  public async isBroadcastingAvailable(): Promise<boolean> {
    return await this.windowStateService.isExternalConnected();
  }

  public isRecordingAvailable(): boolean {
    return this.doc !== null;
  }

  public pauseRecording(): void {
    this.recorder.pause();
    this.doc.recordBroadcastState.next('paused');
  }

  public async startBroadcasting(doc: OpenedDocument): Promise<void> {
    if (!(await this.isBroadcastingAvailable)) {
      console.error('ERROR: broadcasting is not available');
      return;
    }
    this.doc = doc;
    await this.windowStateService.createExternalWindow();
    this.external.setPdf(this.doc.doc.convertedPath);
    this.docSubscription.page = this.doc.currentPage.subscribe((page) =>
      this.external.setPage(page + 1));
    this.docSubscription.state = this.doc.recordBroadcastState.subscribe(this.state);
    this.doc.recordBroadcastState.next('broadcasting');
  }

  public async startRecording(): Promise<void> {
    await this.recorder.setExternalMonitor();
    this.recorder.start();

    this.doc.recordBroadcastState.next('recording');
  }

  public stopBroadcasting(): void {
    this.windowStateService.closeExternalWindow();

    this.doc.recordBroadcastState.next(null);
    this.doc = null
    this.docSubscription.state.unsubscribe();
    this.docSubscription.page.unsubscribe();
  }

  public stopRecording(): void {
    this.recorder.stop(this.doc.doc.convertedPath + '.webm');
    this.doc.recordBroadcastState.next('broadcasting');
  }

}