import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService, DocumentService } from '../../services';

@Component({
  selector: 'app-file-title-menu',
  templateUrl: './file-title-menu.component.html',
  styleUrls: ['./file-title-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTitleMenuComponent {

  constructor(
    public readonly confirmation: ConfirmationService,
    public readonly documentService: DocumentService,
    public readonly router: Router,
  ) { }

  public openDocument(): void {
    this.confirmation.state = 'select-file';
  }

}
