import { BehaviorSubject } from 'rxjs';

import { Document } from './document';
import { PdfDocument } from './pdf';
import { RecordBroadcastState } from './record-broadcast-state';

export interface OpenedDocument {
  doc: Document;
  pdf: PdfDocument;
  selected: boolean;
  currentPage: BehaviorSubject<number>;
  state: BehaviorSubject<RecordBroadcastState>;
};
