import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService,
  DocumentService } from '../../services';
import { FileSelectService } from '../../../file-select/services';

@Component({
  selector: 'app-file-title-menu',
  templateUrl: './file-title-menu.component.html',
  styleUrls: ['./file-title-menu.component.scss'],
})
export class FileTitleMenuComponent {

  constructor(
    public readonly confirmation: ConfirmationService,
    public readonly documentService: DocumentService,
    public readonly fileSelect: FileSelectService,
    public readonly router: Router,
  ) { }

  public async openDocument(): Promise<void> {
    await this.fileSelect.loadMountpoints();
    this.confirmation.state = 'select-file';
  }

}
