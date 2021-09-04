import { ChangeDetectorRef, ChangeDetectionStrategy, Component } from '@angular/core';

import { map } from 'rxjs/operators';

import {
  ConfirmationService,
  DocumentService,
  RecordBroadcastService,
} from '../../services';

@Component({
  selector: 'app-file-view-page',
  templateUrl: './file-view-page.component.html',
  styleUrls: ['./file-view-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileViewPageComponent {

  constructor(
    public readonly cd: ChangeDetectorRef,
    public readonly confirmation: ConfirmationService,
    public readonly documentService: DocumentService,
    public readonly recordBroadcast: RecordBroadcastService,
  ) { }


  // #region Confirmations & dialogs

  public readonly finishRecordConfirmationOpened =
  this.confirmation.stateObservable.pipe(
    map(state => state === 'stop-recording'),
  );

  public readonly fileSelectConfirmationOpened =
  this.confirmation.stateObservable.pipe(
    map(state => state === 'select-broadcasting'),
  );

  public readonly fileCloseConfirmationOpened =
  this.confirmation.stateObservable.pipe(
    map(state => state === 'close-broadcasting'
      || state === 'close-recording'),
  );

  public readonly fileSelectDialogOpened =
  this.confirmation.stateObservable.pipe(
    map(state => state === 'select-file'),
  );

  // #endregion


  public cancelClosing(): void {
    this.documentService.opened.value
      .filter(doc => doc.closingState.value)
      .forEach(doc => doc.closingState.next(false));
    this.confirmation.clearConfirmation();
  }

  public async closeDocument(): Promise<void> {
    if (this.confirmation.state === 'close-recording') {
      this.recordBroadcast.stopRecording();
    }
    this.recordBroadcast.stopBroadcasting();
    await this.documentService.close();
    this.confirmation.clearConfirmation();
  }

  public async fileSelectedHandler(path: string): Promise<void> {
    await this.documentService.open(path);
    this.confirmation.clearConfirmation();
  }

  public startBroadcasting(): Promise<void> {
    this.confirmation.clearConfirmation();
    const selectedDocument = this.documentService.opened.value.find(
      doc => doc.selected,
    );
    if (!selectedDocument) {
      throw new Error('Error: No document selected to start broadcasting.');
    }
    return this.recordBroadcast.startBroadcasting(selectedDocument);
  }

}
