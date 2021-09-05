import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-finish-record-confirmation',
  templateUrl: './finish-record-confirmation.component.html',
  styleUrls: ['./finish-record-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinishRecordConfirmationComponent {

  @Output('confirm-click')
  public readonly confirmClickEmitter = new EventEmitter<void>();

  constructor() { }

}
