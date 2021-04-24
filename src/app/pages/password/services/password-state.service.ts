import { Injectable } from '@angular/core';

import { BehaviorSubject, } from 'rxjs';

type PasswordPageState = null | 'logout' | 'settings';

@Injectable({
  providedIn: 'root'
})
export class PasswordStateService {

  private pageStateSubject = new BehaviorSubject<PasswordPageState>(null);

  public pageStateObservable = this.pageStateSubject.asObservable();

  constructor() { }

  public get pageState(): PasswordPageState {
    return this.pageStateSubject.value;
  }

  public set pageState(value: PasswordPageState) {
    this.pageStateSubject.next(value);
  }

  public continueWithPassword() {
    if (this.pageState === 'settings') {
      console.log('settings page was called');
    }
  }

}
