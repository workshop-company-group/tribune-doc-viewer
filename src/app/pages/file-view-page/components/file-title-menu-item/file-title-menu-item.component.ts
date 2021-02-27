import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { OpenedDocument } from '../../models';

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

  constructor() {}

  public close(): void {
    this.closeEvent.emit();
  }

}
