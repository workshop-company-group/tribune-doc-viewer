import { Document } from './document';
import { PdfDocument } from './pdf'; 

export interface OpenedDocument {
  doc: Document;
  pdf: PdfDocument;
  selected: boolean;
  currentPage: number;
};
