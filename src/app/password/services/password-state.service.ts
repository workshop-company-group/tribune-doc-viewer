import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { WindowStateService } from '../../shared/services';
import { DocumentService, RecordBroadcastService } from '../../file-view/services';

type PasswordPageState = null | 'quit' | 'settings';

@Injectable({
  providedIn: 'root',
})
export class PasswordStateService {

  private readonly pageStateSubject = new
  BehaviorSubject<PasswordPageState>(null);

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

  public async continueWithPassword(): Promise<void> {
    switch (this.pageState) {
    case 'settings':
      this.pageState = null;
      await this.router.navigate(['/settings']);
      break;

    case 'quit':
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
      const documentsLength = this.documentService.opened.length;
      for (let i = 0; i < documentsLength; i++) {
        await this.documentService.close(0);
      }

      this.windowState.exit();
      break;
    }
  }
}
