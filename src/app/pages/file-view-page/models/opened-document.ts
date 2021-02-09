import { Document } from './document';

export interface OpenedDocument {
  doc: Document;
  selected: boolean;
  currentPage: number;
};
