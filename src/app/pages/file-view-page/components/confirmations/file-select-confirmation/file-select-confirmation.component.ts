import { Component, EventEmitter, Output } from '@angular/core';

import { DocumentService } from '../../../services';

@Component({
  selector: 'app-file-select-confirmation',
  templateUrl: './file-select-confirmation.component.html',
  styleUrls: ['./file-select-confirmation.component.scss']
})
export class FileSelectConfirmationComponent {

  @Output('cancel-click')
  public readonly cancelClickEmitter = new EventEmitter<void>();

  @Output('select-click')
  public readonly selectClickEmitter = new EventEmitter<void>(); // FIXME: output type

  constructor(
    public readonly documentService: DocumentService,
  ) {}

}
