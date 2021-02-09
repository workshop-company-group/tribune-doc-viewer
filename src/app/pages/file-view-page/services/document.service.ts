import { Injectable } from '@angular/core';

import { OpenedDocument } from '../models'
import { ConversionService } from './conversion.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  public opened: OpenedDocument[] = [];

  constructor(private converter: ConversionService) {}

  public get count(): number {
    return this.opened.length;
  }

  public open(): void {
  }

  public close(index: number): void {
    this.opened.splice(index, 1);
    // TODO: remove pdf
  }

  public isEmpty(): boolean {
    return this.opened.length === 0;
  }

  public unselectAll(): void {
    for (const doc of this.opened) {
      doc.selected = false;
    }
  }

}
