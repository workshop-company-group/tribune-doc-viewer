import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { DocumentService } from '../../../file-view/services';
import { LicenseService } from '../../../license/services';
import { AuthService, PasswordStateService } from '../../../password/services';
import { UpdateService } from '../../../update/services/update.service';

@Component({
  selector: 'app-main-menu-page',
  templateUrl: './main-menu-page.component.html',
  styleUrls: ['./main-menu-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuPageComponent {

  constructor(
    public readonly auth: AuthService,
    public readonly documentService: DocumentService,
    public readonly license: LicenseService,
    public readonly passwordState: PasswordStateService,
    public readonly router: Router,
    public readonly updateService: UpdateService,
  ) { }

  public async openFileView(): Promise<void> {
    await this.router.navigate(['/file-view']);
  }

  public openSettings(): Promise<void> {
    this.passwordState.pageState = 'settings';
    return this.continueWithPassword();
  }

  public quitApplication(): Promise<void> {
    this.passwordState.pageState = 'quit';
    return this.continueWithPassword();
  }

  private async continueWithPassword(): Promise<void> {
    if (this.auth.hasPassword()) {
      await this.router.navigate(['/password']);
      return;
    }

    return this.passwordState.continueWithPassword();
  }

}
