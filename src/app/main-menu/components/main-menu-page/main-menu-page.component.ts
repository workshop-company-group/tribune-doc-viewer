import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DocumentService } from '../../../file-view/services';
import { LicenseService } from '../../../license/services';
import { AuthService, PasswordStateService } from '../../../password/services';
import { UpdateService } from '../../../update/services/update.service';

@Component({
  selector: 'app-main-menu-page',
  templateUrl: './main-menu-page.component.html',
  styleUrls: ['./main-menu-page.component.scss'],
})
export class MainMenuPageComponent implements OnInit {

  constructor(
    public readonly auth: AuthService,
    public readonly documentService: DocumentService,
    public readonly license: LicenseService,
    public readonly passwordState: PasswordStateService,
    public readonly router: Router,
    public readonly updateService: UpdateService,
  ) { }

  public ngOnInit(): void {
    // empty
  }

  public openFileView(): void {
    void this.router.navigate(['/file-view']);
  }

  public openSettings(): void {
    this.passwordState.pageState = 'settings';
    this.continueWithPassword();
  }

  public quitApplication(): void {
    this.passwordState.pageState = 'quit';
    this.continueWithPassword();
  }

  private continueWithPassword(): void {
    if (this.auth.hasPassword()) {
      void this.router.navigate(['/password']);
      return;
    }

    this.passwordState.continueWithPassword();
  }

}
