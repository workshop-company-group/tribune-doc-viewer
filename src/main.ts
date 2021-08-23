import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppConfig } from './environments/environment';

import * as fs from 'fs';

import { remote } from 'electron';
const { app } = remote;

if (AppConfig.production) {
  try { fs.mkdirSync(app.getPath('userData')); } catch (error) {}
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    preserveWhitespaces: false
  })
  .catch(err => console.error(err));
