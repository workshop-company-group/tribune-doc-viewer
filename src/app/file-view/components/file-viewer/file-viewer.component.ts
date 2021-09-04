import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ConfirmationService, DocumentService } from '../../services';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileViewerComponent {

  constructor(
    public readonly confirmation: ConfirmationService,
    public readonly documentService: DocumentService,
  ) { }

  public openDocument(): void {
    this.confirmation.state = 'select-file';
  }

}
