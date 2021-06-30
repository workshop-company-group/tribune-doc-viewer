import { Injectable } from '@angular/core';

import * as jsonfile from 'jsonfile'
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject, } from 'rxjs';

import { Auth } from '../models';

const EMPTY_PASSWORD = '';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jsonfile: typeof jsonfile = window.require('jsonfile');

  private readonly salt =
    '2q~hYC?d[3=#-5-*Yx,~lamrX0nMssNT12I[XVT{L91ovoRnE8F%m%3%&H+!oRlq';

  private readonly passwordSubject = new BehaviorSubject<string>(
    this.readPassword()
  );

  public readonly passwordObservable = this.passwordSubject.asObservable();

  constructor() {}

  public clearPassword(): void {
    this.setPassword(EMPTY_PASSWORD);
  }

  public hasPassword(): boolean {
    return this.passwordSubject.value !== EMPTY_PASSWORD;
  }

  public setPassword(password: string): void {
    const encrypted = CryptoJS.AES.encrypt(password, this.salt).toString();
    const auth: Auth = { password: encrypted };
    this.jsonfile.writeFileSync('auth.json', auth);

    this.passwordSubject.next(password);
  }

  public passwordIsValid(password: string): boolean {
    return password === this.readPassword();
  }

  private readPassword(): string {
    const auth: Auth = this.jsonfile.readFileSync('auth.json');
    const decrypted = CryptoJS.AES.decrypt(auth.password, this.salt).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

}
