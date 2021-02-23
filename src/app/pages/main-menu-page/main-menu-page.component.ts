import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WindowStateService } from '../../shared/services/window-state.service';
import { UpdateService } from '../../update/services/update.service';
import { DocumentService } from '../file-view-page/services';

@Component({
  selector: 'app-main-menu-page',
  templateUrl: './main-menu-page.component.html',
  styleUrls: ['./main-menu-page.component.scss']
})
export class MainMenuPageComponent implements OnInit {

  constructor(public documentService: DocumentService,
              private stateService: WindowStateService,
              private router: Router,
              public updateService: UpdateService) { }

  ngOnInit(): void {}

  public openFileView(): void {
    this.router.navigate(['/file-view']);
  }

  public openSettings(): void {
    console.log('Settings page called');
  }

  public quitApplication(): void {
    this.stateService.exit();
  }

}
