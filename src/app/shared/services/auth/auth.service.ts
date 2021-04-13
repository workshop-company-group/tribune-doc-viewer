import { Injectable } from '@angular/core';
import * as fs from 'fs';
import * as jsonfile from 'jsonfile'
import { Auth } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fs: typeof fs;
  jsonfile: typeof jsonfile;

  constructor() {
    this.fs = window.require('fs');
    this.fs = window.require('jsonfile');
  }

  public setPassword(password: string): void {
    const auth: Auth = { password };
    this.jsonfile.writeFileSync('auth.json', auth);
  }

  public passwordIsValid(password: string): boolean {
    const auth: Auth = this.jsonfile.readFileSync('auth.json');
    return password === auth.password;
  }
}
