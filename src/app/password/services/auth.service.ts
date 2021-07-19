import { Injectable } from '@angular/core';

import * as jsonfile from 'jsonfile'
import * as CryptoJS from 'crypto-js';
import * as fs from 'fs';
import { BehaviorSubject, Observable, } from 'rxjs';

import { Auth } from '../models';
import { AppConfig } from '../../../environments/environment';

const EMPTY_PASSWORD = '';
const FILENAME = 'auth.json'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jsonfile: typeof jsonfile = window.require('jsonfile');

  private readonly salt = AppConfig.salt;

  private passwordSubject: BehaviorSubject<string>

  public passwordObservable: Observable<string>

  constructor() {
    if (!fs.existsSync(FILENAME)) {
      const encrypted = CryptoJS.AES.encrypt(EMPTY_PASSWORD, this.salt).toString();
      const auth: Auth = { password: encrypted };
      this.jsonfile.writeFileSync(FILENAME, auth);
    }
    this.passwordSubject= new BehaviorSubject<string>(this.readPassword());
    this.passwordObservable = this.passwordSubject.asObservable();
  }

  public clearPassword(): void {
    this.setPassword(EMPTY_PASSWORD);
  }

  public hasPassword(): boolean {
    return this.passwordSubject.value !== EMPTY_PASSWORD;
  }

  public setPassword(password: string): void {
    const encrypted = CryptoJS.AES.encrypt(password, this.salt).toString();
    const auth: Auth = { password: encrypted };
    this.jsonfile.writeFileSync(FILENAME, auth);
    this.passwordSubject.next(password);
  }

  public passwordIsValid(password: string): boolean {
    return password === this.readPassword();
  }

  private readPassword(): string {
    const auth: Auth = this.jsonfile.readFileSync(FILENAME);
    const decrypted = CryptoJS.AES.decrypt(auth.password, this.salt)
      .toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

}
