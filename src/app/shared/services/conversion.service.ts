import { Injectable } from '@angular/core';
import { Document } from '../../models/document';
import * as path from 'path';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  path: typeof path;

  constructor() {
    this.path = window.require('path');
  }

  private getFileType(path: string): string {
    return this.path.extname(path);
  }

  public convertDocument(path: string): Document {
  }

}
