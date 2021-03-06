import { Component, EventEmitter, Output } from '@angular/core';

import { DocumentService } from '../../../services';

@Component({
  selector: 'app-file-choose-confirmation',
  templateUrl: './file-choose-confirmation.component.html',
  styleUrls: ['./file-choose-confirmation.component.scss']
})
export class FileChooseConfirmationComponent {

  @Output('cancel-click')
  public readonly cancelClickEmitter = new EventEmitter<void>();

  @Output('select-click')
  public readonly selectClickEmitter = new EventEmitter<void>(); // FIXME: output type

  constructor(
    public readonly documentService: DocumentService,
  ) {}

}
