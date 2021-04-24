import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, } from 'rxjs';

import { WindowStateService } from '../../../shared/services';
import { DocumentService, RecordBroadcastService, } from '../../file-view/services';

type PasswordPageState = null | 'quit' | 'settings';

@Injectable({
  providedIn: 'root'
})
export class PasswordStateService {

  private pageStateSubject = new BehaviorSubject<PasswordPageState>(null);

  public pageStateObservable = this.pageStateSubject.asObservable();

  constructor(
    private readonly documentService: DocumentService,
    private readonly recordBroadcast: RecordBroadcastService,
    private readonly router: Router,
    private readonly windowState: WindowStateService,
  ) { }

  public get pageState(): PasswordPageState {
    return this.pageStateSubject.value;
  }

  public set pageState(value: PasswordPageState) {
    this.pageStateSubject.next(value);
  }

  public continueWithPassword() {
    if (this.pageState === 'settings') {
      this.pageState = null;
      //this.router.navigate(['/settings']);
      console.log('settings page was called');

    } else if (this.pageState === 'quit') {
      this.pageState = null;

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

      this.windowState.exit();
    }
  }

}
