import * as pdfjs from 'pdfjs-dist';

import { PdfPage } from './pdf-page';

// wrapper for PDFDocumentProxy class from pdf.js
export class PdfDocument {

  // TODO: make private
  public docProxy; // typeof docProxy === PDFDocumentProxy
  
  constructor() {}

  public get numPages(): number {
    return this.docProxy.numPages;
  }

  // index of first page is 0
  public async getPage(index: number): Promise<PdfPage> {
    return new PdfPage(await this.docProxy.getPage(index + 1))
  }

  public async init(path: string): Promise<void> {
    this.docProxy = await pdfjs.getDocument(path).promise; 
  }

}
