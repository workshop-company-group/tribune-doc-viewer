import { Component } from '@angular/core';

import {
  ConfirmationService,
  DocumentService,
  RecordBroadcastService,
} from '../../services';
import { FileSelectService } from '../../../file-select/services';

@Component({
  selector: 'app-file-view-page',
  templateUrl: './file-view-page.component.html',
  styleUrls: ['./file-view-page.component.scss'],
})
export class FileViewPageComponent {

  constructor(
    public readonly confirmation: ConfirmationService,
    public readonly documentService: DocumentService,
    public readonly fileSelect: FileSelectService,
    public readonly recordBroadcast: RecordBroadcastService,
  ) { }

  public cancelClosing(): void {
    for (const doc of this.documentService.opened) {
      if (doc.closingState.value) {
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
    void this.documentService.close();
    this.confirmation.state = null;
  }

  public async fileSelectedHandler(path: string): Promise<void> {
    await this.documentService.open(path);
    this.confirmation.state = null;
  }

  public startBroadcasting(): void {
    this.confirmation.state = null;
    void this.recordBroadcast.startBroadcasting(
      this.documentService.selected);
  }

}
