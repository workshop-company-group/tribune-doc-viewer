import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Document } from '../../models';

@Component({
  selector: 'app-file-title-menu-item',
  templateUrl: './file-title-menu-item.component.html',
  styleUrls: ['./file-title-menu-item.component.scss']
})
export class FileTitleMenuItemComponent implements OnInit {

  @Input('document')
  public doc: Document;

  @Input()
  public selected: boolean;

  @Output('close')
  public closeEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public close(): void {
    this.closeEvent.emit();
  }

}
