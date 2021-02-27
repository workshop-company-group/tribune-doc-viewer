import { Injectable } from '@angular/core';

import { ExternalViewerService,
         RecorderService,
         WindowStateService, } from '../../../shared/services';
import { OpenedDocument, RecordBroadcastState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RecordBroadcastService {

  private doc: OpenedDocument = null;

  public get docState(): RecordBroadcastState {
    if (this.doc === null) {
      return null;
    }
    return this.doc.state;
  }

  constructor(
    private readonly external: ExternalViewerService,
    private readonly recorder: RecorderService,
    private readonly windowStateService: WindowStateService,
  ) { }

  public continueRecording(): void {
    this.doc.state = 'recording';
  }

  public async isBroadcastingAvailable(): Promise<boolean> {
    return await this.windowStateService.isExternalConnected();
  }

  public isRecordingAvailable(): boolean {
    return this.doc !== null;
  }

  public pauseRecording(): void {
    this.doc.state = 'paused';
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

    this.doc.state = 'broadcasting';
  }

  public async startRecording(): Promise<void> {
    await this.recorder.setExternalMonitor();
    this.recorder.start();

    this.doc.state = 'recording';
  }

  public stopBroadcasting(): void {
    this.windowStateService.closeExternalWindow();

    this.doc = null;
  }

  public stopRecording(): void {
    this.recorder.stop(this.doc.doc.convertedPath + '.webm');
    this.doc.state = 'broadcasting';
  }

}
