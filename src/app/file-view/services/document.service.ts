import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { List, Record, RecordOf } from 'immutable';

import { Document,
  OpenedDocument,
  PdfDocument,
  RecordBroadcastState } from '../models';

import { ConversionService } from './conversion.service';
import { PdfService } from './pdf.service';
import { FileSystemService } from '../../shared/services';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {

  /**
   * Currently opened documents.
   */
  public readonly opened = new
  BehaviorSubject<List<RecordOf<OpenedDocument>>>(List());

  /**
   * Number of opened documents.
   */
  public readonly count = this.opened.pipe(
    map(docs => docs.size),
  );

  /**
   * Boolean value that is true if no documents are opened.
   */
  public readonly isEmpty = this.count.pipe(
    map(count => count === 0),
  );

  /**
   * Currently selected document.
   * May be undefined only during single event loop (i. e. inside function
   * block, at the end of function must be not undefined).
   */
  public readonly selected = this.opened.pipe(
    map(docs => docs.find(doc => doc.selected)),
  );

  private readonly documentFactory = Record<OpenedDocument>({
    // Should be reinitialized
    doc: { originPath: '', convertedPath: '', title: '' },
    // Should be reinitialized
    pdf: new PdfDocument(),
    selected: false,
    currentPage: new BehaviorSubject<number>(0),
    recordBroadcastState: new BehaviorSubject<RecordBroadcastState>(null),
    closingState: new BehaviorSubject<boolean>(false),
  });

  constructor(
    private readonly converter: ConversionService,
    private readonly fileSystem: FileSystemService,
    private readonly pdfService: PdfService,
  ) {}

  private findClosingIndex(): number {
    const closingDocumentIndex =
      this.opened.value.findIndex(doc => doc.closingState.value);
    if (closingDocumentIndex === -1) {
      throw new Error('Error: Failed to find closing index.');
    }
    return closingDocumentIndex;
  }

  public async open(path: string): Promise<void> {
    const doc: Document = await this.converter.convertDocument(path);
    const pdf: PdfDocument = await this.pdfService.loadPdf(doc.convertedPath);

    this.unselectAll();
    this.opened.next(
      this.opened.value.push(
        this.documentFactory({ doc, pdf, selected: true }),
      ),
    );
  }

  public async close(index?: number): Promise<void> {
    const closingIndex = index ?? this.findClosingIndex();

    const closingDocument = this.opened.value.get(closingIndex);
    if (!closingDocument) {
      throw new Error('Error: Cannot find document to close.');
    }
    await this.fileSystem.removeFile(closingDocument.doc.convertedPath);
    this.opened.next(
      this.opened.value.splice(closingIndex, 1),
    );

    if (this.opened.value.size > 0) {
      this.select(0);
    }
  }

  public select(index: number): void {
    this.unselectAll();
    this.opened.next(
      this.opened.value.setIn([index, 'selected'], true),
    );
  }

  private unselectAll(): void {
    this.opened.next(
      this.opened.value.map(doc => doc.set('selected', false)),
    );
  }

}
