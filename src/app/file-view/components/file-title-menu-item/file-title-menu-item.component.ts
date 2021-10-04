import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

import { RecordOf } from 'immutable';

import { OpenedDocument } from '../../models';
import { ConfirmationService } from '../../services';

@Component({
  selector: 'app-file-title-menu-item',
  templateUrl: './file-title-menu-item.component.html',
  styleUrls: ['./file-title-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTitleMenuItemComponent {

  constructor(
    private readonly confirmation: ConfirmationService,
  ) {}

  @Input()
  public doc: RecordOf<OpenedDocument>;

  @Output('close-click')
  public readonly closeEvent = new EventEmitter<void>();

  @HostBinding('class.selected')
  public get isSelected(): boolean {
    return this.doc.selected;
  }

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
