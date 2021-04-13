import { Injectable } from '@angular/core';

import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor() { }

  public async removeFile(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.unlink(path, (err) => {
        if (err !== null) {
          reject(err);
        } else {
          resolve();
        }
      })
    });
  }
}
