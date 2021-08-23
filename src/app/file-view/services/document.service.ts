import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Document,
         OpenedDocument,
         PdfDocument,
         RecordBroadcastState, } from '../models'

import { ConversionService } from './conversion.service';
import { PdfService } from './pdf.service';
import { FileSystemService } from '../../shared/services';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  public readonly opened: OpenedDocument[] = [];

  constructor(
    private readonly converter: ConversionService,
    private readonly fileSystem: FileSystemService,
    private readonly pdfService: PdfService,
  ) {}

  public get count(): number {
    return this.opened.length;
  }

  public get selected(): OpenedDocument {
    return this.opened.filter(doc => doc.selected)[0];
  }

  private findClosingIndex(): number {
    const closingDocumentIndex = this.opened.findIndex(doc => doc.closingState.value);
    if (closingDocumentIndex === -1) {
      throw new Error("Error: failed to find closing index");
    }
    return closingDocumentIndex;
  }

  public async open(path: string): Promise<void> {
    const doc: Document = await this.converter.convertDocument(path);
    const pdf: PdfDocument = await this.pdfService.loadPdf(doc.convertedPath);

    this.opened.push({
      doc,
      pdf,
      selected: false,
      currentPage: new BehaviorSubject<number>(0),
      recordBroadcastState: new BehaviorSubject<RecordBroadcastState>(null),
      closingState: new BehaviorSubject<boolean>(false),
    });

    // selecting opened document
    this.unselectAll();
    this.opened[this.opened.length - 1].selected = true;

  }

  public async close(index?: number): Promise<void> {
    if (index === undefined) {
      index = this.findClosingIndex();
    }
    if (index === undefined) {
      return;
    }

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
