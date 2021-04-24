import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WindowStateService } from '../../shared/services/window-state/window-state.service';
import { UpdateService } from '../../update/services/update.service';
import { DocumentService, RecordBroadcastService, } from '../file-view/services';
import { PasswordStateService, } from '../password/services';

@Component({
  selector: 'app-main-menu-page',
  templateUrl: './main-menu-page.component.html',
  styleUrls: ['./main-menu-page.component.scss']
})
export class MainMenuPageComponent implements OnInit {

  constructor(
    public readonly documentService: DocumentService,
    public readonly passwordState: PasswordStateService,
    public readonly recordBroadcast: RecordBroadcastService,
    public readonly router: Router,
    public readonly stateService: WindowStateService,
    public readonly updateService: UpdateService
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
    // stop recording and broadcasting
    if (this.recordBroadcast.state.value) {
      if (this.recordBroadcast.state.value === 'recording'
        || this.recordBroadcast.state.value === 'paused') {
        this.recordBroadcast.stopRecording();
      }
      this.recordBroadcast.stopBroadcasting();
    }

    // remove converted documents
    for (const index in this.documentService.opened) {
      this.documentService.close(0);
    }

    this.stateService.exit();
  }

}
