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

  private docSubscription: Subscription;

  constructor(
    private readonly external: ExternalViewerService,
    private readonly recorder: RecorderService,
    private readonly windowStateService: WindowStateService,
  ) { }

  public resumeRecording(): void {
    this.doc.recordBroadcastState.next('recording');
  }

  public async isBroadcastingAvailable(): Promise<boolean> {
    return await this.windowStateService.isExternalConnected();
  }

  public isRecordingAvailable(): boolean {
    return this.doc !== null;
  }

  public pauseRecording(): void {
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
    this.doc.currentPage.subscribe((page) =>
      this.external.setPage(page+1));
    this.docSubscription = this.doc.state.subscribe(this.state);
    this.doc.state.next('broadcasting');
  }

  public async startRecording(): Promise<void> {
    await this.recorder.setExternalMonitor();
    this.recorder.start();

    this.doc.recordBroadcastState.next('recording');
  }

  public stopBroadcasting(): void {
    this.windowStateService.closeExternalWindow();

    this.doc.recordBroadcastState = null;
    this.doc = null
    this.docSubscription.unsubscribe();
  }

  public stopRecording(): void {
    this.recorder.stop(this.doc.doc.convertedPath + '.webm');
    this.doc.recordBroadcastState.next('broadcasting');
  }

}
