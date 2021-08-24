import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

type ConfirmationState = null | 'stop-recording'
| 'close-recording'
| 'close-broadcasting'
| 'select-file'
| 'select-broadcasting';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {

  private readonly stateObservable = new
  BehaviorSubject<ConfirmationState>(null);

  constructor() { }

  public get state(): ConfirmationState {
    return this.stateObservable.value;
  }

  public set state(value: ConfirmationState) {
    this.stateObservable.next(value);
  }

  public clearConfirmation(): void {
    this.state = null;
  }

}
