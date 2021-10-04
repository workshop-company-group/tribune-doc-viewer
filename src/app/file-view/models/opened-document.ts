import { PDFDocumentProxy } from 'pdfjs-dist';
import { BehaviorSubject } from 'rxjs';

import { Document } from './document';
import { RecordBroadcastState } from './record-broadcast-state';

export interface OpenedDocument {
  doc: Document;
  pdf?: PDFDocumentProxy;
  selected: boolean;
  /**
   * Index of opened page in document. Indexing start at 0.
   */
  currentPage: BehaviorSubject<number>;
  recordBroadcastState: BehaviorSubject<RecordBroadcastState>;
  /**
   * State that indicates that file is closing at the moment.
   */
  closingState: BehaviorSubject<boolean>;
}
