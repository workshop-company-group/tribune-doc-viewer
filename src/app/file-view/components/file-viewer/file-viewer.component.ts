import { Component } from '@angular/core';

import { ConfirmationService,
  DocumentService } from '../../services';

import { FileSelectService } from '../../../file-select/services';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss'],
})
export class FileViewerComponent {

  constructor(
    public readonly confirmation: ConfirmationService,
    public readonly documentService: DocumentService,
    public readonly fileSelect: FileSelectService,
  ) { }

  public async openDocument(): Promise<void> {
    await this.fileSelect.loadMountpoints();
    this.confirmation.state = 'select-file';
  }

}
