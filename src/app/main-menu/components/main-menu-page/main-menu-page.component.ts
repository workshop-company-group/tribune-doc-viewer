import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DocumentService, } from '../../../file-view/services';
import { LicenseService, } from '../../../license/services';
import { PasswordStateService, } from '../../../password/services';
import { UpdateService, } from '../../../update/services/update.service';

@Component({
  selector: 'app-main-menu-page',
  templateUrl: './main-menu-page.component.html',
  styleUrls: ['./main-menu-page.component.scss']
})
export class MainMenuPageComponent implements OnInit {

  constructor(
    public readonly documentService: DocumentService,
    public readonly license: LicenseService,
    public readonly passwordState: PasswordStateService,
    public readonly router: Router,
    public readonly updateService: UpdateService,
  ) { }

  ngOnInit(): void {}

  public openFileView(): void {
    this.router.navigate(['/file-view']);
  }

  public openSettings(): void {
    this.passwordState.pageState = 'settings';
    this.router.navigate(['/password']);
  }

  public quitApplication(): void {
    this.passwordState.pageState = 'quit';
    this.router.navigate(['/password']);
  }

}
