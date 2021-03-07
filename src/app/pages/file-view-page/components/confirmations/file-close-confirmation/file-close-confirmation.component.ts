import { Component, EventEmitter, Output, } from '@angular/core';

import { ConfirmationService } from '../../../services';

@Component({
  selector: 'app-file-close-confirmation',
  templateUrl: './file-close-confirmation.component.html',
  styleUrls: ['./file-close-confirmation.component.scss']
})
export class FileCloseConfirmationComponent {

  @Output('confirm-click')
  public readonly confirmClickEmitter = new EventEmitter<void>();

  @Output('cancel-click')
  public readonly cancelClickEmitter = new EventEmitter<void>();

  constructor(
    public readonly confirmation: ConfirmationService,
  ) {}

}
