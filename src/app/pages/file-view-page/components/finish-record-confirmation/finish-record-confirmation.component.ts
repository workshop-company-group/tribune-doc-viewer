import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-finish-record-confirmation',
  templateUrl: './finish-record-confirmation.component.html',
  styleUrls: ['./finish-record-confirmation.component.scss']
})
export class FinishRecordConfirmationComponent {

  @Output('confirm-clicked')
  public readonly confirmClickEmitter = new EventEmitter<void>();

  constructor() { }

}
