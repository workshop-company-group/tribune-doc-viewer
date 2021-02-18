import { Injectable } from '@angular/core';

import { OpenedDocument } from '../models'
import { ConversionService } from './conversion.service';

import { FileSystemService } from '../../../shared/services';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  public opened: OpenedDocument[] = [];

  constructor(private converter: ConversionService,
              private fileSystem: FileSystemService) {}

  public get count(): number {
    return this.opened.length;
  }

  public open(path: string): void {
    this.converter.convertDocument(path).then((doc) => {
      this.opened.push({
        doc,
        selected: false,
        currentPage: 1
      });

      // selecting opened document
      this.unselectAll();
      this.opened[this.opened.length - 1].selected = true;
    });
  }

  public async close(index: number): Promise<void> {
    await this.fileSystem.removeFile(this.opened[index].doc.convertedPath);
    this.opened.splice(index, 1);

    if (this.opened.length > 0) {
      this.select(0);
    }
  }

  public isEmpty(): boolean {
    return this.opened.length === 0;
  }

  public select(index: number): void {
    this.unselectAll();
    this.opened[index].selected = true;
  }

  private unselectAll(): void {
    for (const doc of this.opened) {
      doc.selected = false;
    }
  }

}
