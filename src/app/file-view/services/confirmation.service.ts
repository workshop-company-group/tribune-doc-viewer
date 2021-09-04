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

  private readonly stateSubject = new
  BehaviorSubject<ConfirmationState>(null);

  public readonly stateObservable = this.stateSubject.asObservable();

  constructor() { }

  public get state(): ConfirmationState {
    return this.stateSubject.value;
  }

  public set state(value: ConfirmationState) {
    this.stateSubject.next(value);
  }

  public clearConfirmation(): void {
    this.state = null;
  }

}
