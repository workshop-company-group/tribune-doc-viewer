import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

type ConfirmationState = null | 'stop-recording'
                              | 'close-recording'
                              | 'close-broadcasting'
                              | 'select-file'
                              | 'select-broadcasting';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  private readonly stateObservable = new BehaviorSubject<ConfirmationState>(null);

  constructor() { }

  get state(): ConfirmationState {
    return this.stateObservable.value;
  }

  set state(value: ConfirmationState) {
    this.stateObservable.next(value);
  }

}
