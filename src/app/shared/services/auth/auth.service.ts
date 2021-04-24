import { Injectable } from '@angular/core';
import * as fs from 'fs';
import * as jsonfile from 'jsonfile'
import { Auth } from '../../models/auth';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fs: typeof fs;
  jsonfile: typeof jsonfile;
  private salt = '2q~hYC?d[3=#-5-*Yx,~lamrX0nMssNT12I[XVT{L91ovoRnE8F%m%3%&H+!oRlq';

  constructor() {
    this.fs = window.require('fs');
    this.jsonfile = window.require('jsonfile');
  }

  public setPassword(password: string): void {
    const encrypted = CryptoJS.AES.encrypt(password, this.salt).toString();
    const auth: Auth = { password: encrypted };
    this.jsonfile.writeFileSync('auth.json', auth);
  }

  public passwordIsValid(password: string): boolean {
    const auth: Auth = this.jsonfile.readFileSync('auth.json');
    const decrypted = CryptoJS.AES.decrypt(auth.password, this.salt).toString(CryptoJS.enc.Utf8);
    return password === decrypted;
  }
}
