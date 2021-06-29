import { Component, } from '@angular/core';

import {
  ConfirmationService,
  DocumentService,
  RecordBroadcastService,
} from '../../services';

@Component({
  selector: 'app-file-view-page',
  templateUrl: './file-view-page.component.html',
  styleUrls: ['./file-view-page.component.scss']
})
export class FileViewPageComponent {

  constructor(
    public readonly confirmation: ConfirmationService,
    private readonly documentService: DocumentService,
    private readonly recordBroadcast: RecordBroadcastService,
  ) { }

  public cancelClosing(): void {
    for (const doc of this.documentService.opened) {
      if (doc.closingState.value === true) {
        doc.closingState.next(false);
      }
    }
    this.confirmation.state = null;
  }

  public closeDocument(): void {
    if (this.confirmation.state === 'close-recording') {
      this.recordBroadcast.stopRecording();
    }
    this.recordBroadcast.stopBroadcasting();
    this.documentService.close();
    this.confirmation.state = null;
  }

  public fileSelectedHandler(): void {
    this.confirmation.state = null;
  }

  public startBroadcasting(): void {
    this.confirmation.state = null;
    this.recordBroadcast.startBroadcasting(
      this.documentService.selected);
  }

}
