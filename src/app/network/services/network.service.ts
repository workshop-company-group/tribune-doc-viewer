import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  public readonly connection = new BehaviorSubject<boolean>(this.isConnected);

  constructor() { }

  private get isConnected(): boolean {
    return window.navigator.onLine;
  }

  public updateConnection(): void {
    this.connection.next(this.isConnected);
  }

}
