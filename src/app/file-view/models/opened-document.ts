import { BehaviorSubject } from 'rxjs';

import { Document } from './document';
import { PdfDocument } from './pdf';
import { RecordBroadcastState } from './record-broadcast-state';

export interface OpenedDocument {
  doc: Document;
  pdf: PdfDocument;
  selected: boolean;
  currentPage: BehaviorSubject<number>;
  recordBroadcastState: BehaviorSubject<RecordBroadcastState>;
  /**
   * State that indicates that file is closing at the moment.
   */
  closingState: BehaviorSubject<boolean>;
}
