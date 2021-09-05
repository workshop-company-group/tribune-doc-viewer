/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// as angular cannot import jsonfile and crypto-js correctly

import { Injectable } from '@angular/core';
import { remote } from 'electron';
const { app } = remote;

import * as jsonfile from 'jsonfile';
import * as CryptoJS from 'crypto-js';
import * as fs from 'fs';
import * as path from 'path';

import { BehaviorSubject, Observable } from 'rxjs';

import { Auth } from '../models';
import { AppConfig } from '../../../environments/environment';

const EMPTY_PASSWORD = '';
const AUTH_FILENAME = path.join(app.getPath('userData'), 'auth.json');

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly passwordSubject: BehaviorSubject<string>;

  public passwordObservable: Observable<string>;

  constructor() {
    if (!fs.existsSync(AUTH_FILENAME)) {
      const encrypted = CryptoJS.AES.encrypt(
        EMPTY_PASSWORD,
        AppConfig.salt,
      ).toString();
      const auth: Auth = { password: encrypted as string };
      jsonfile.writeFileSync(AUTH_FILENAME, auth);
    }
    this.passwordSubject = new BehaviorSubject<string>(this.readPassword());
    this.passwordObservable = this.passwordSubject.asObservable();
  }

  public clearPassword(): void {
    this.setPassword(EMPTY_PASSWORD);
  }

  public hasPassword(): boolean {
    return this.passwordSubject.value !== EMPTY_PASSWORD;
  }

  public setPassword(password: string): void {
    const encrypted = CryptoJS.AES.encrypt(password, AppConfig.salt).toString();
    const auth: Auth = { password: encrypted };
    jsonfile.writeFileSync(AUTH_FILENAME, auth);
    this.passwordSubject.next(password);
  }

  public passwordIsValid(password: string): boolean {
    return password === this.readPassword();
  }

  private readPassword(): string {
    const auth: Auth = jsonfile.readFileSync(AUTH_FILENAME);
    const decrypted = CryptoJS.AES.decrypt(auth.password, AppConfig.salt)
      .toString(CryptoJS.enc.Utf8);
    return decrypted as string;
  }

}
