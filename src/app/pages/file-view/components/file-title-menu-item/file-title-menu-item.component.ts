import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { OpenedDocument } from '../../models';
import { ConfirmationService } from '../../services';

@Component({
  selector: 'app-file-title-menu-item',
  templateUrl: './file-title-menu-item.component.html',
  styleUrls: ['./file-title-menu-item.component.scss']
})
export class FileTitleMenuItemComponent {

  @Input('document')
  public doc: OpenedDocument;

  @Output('close')
  public closeEvent = new EventEmitter<void>();

  constructor(
    private readonly confirmation: ConfirmationService,
  ) {}

  public close(): void {
    this.doc.closingState.next(true);
    if (this.doc.recordBroadcastState.value === 'recording'
      || this.doc.recordBroadcastState.value === 'paused') {
      this.confirmation.state = 'close-recording';
    } else if (this.doc.recordBroadcastState.value === 'broadcasting') {
      this.confirmation.state = 'close-broadcasting';
    } else {
      this.closeEvent.emit();
    }
  }

}
