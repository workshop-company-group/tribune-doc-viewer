import * as pdfjs from 'pdfjs-dist';

import { PdfPage } from './pdf-page';
import { PdfOrientation } from './pdf-orientation';

// wrapper for PDFDocumentProxy class from pdf.js
export class PdfDocument {

  // pdfjs does not have PDFDocumentProxy type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private docProxy: any; // typeof docProxy === PDFDocumentProxy

  public orientation: PdfOrientation;

  constructor() {}

  public get numPages(): number {
    // pdfjs does not have PDFDocumentProxy type
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    return this.docProxy.numPages;
  }

  // index of first page is 0
  public async getPage(index: number): Promise<PdfPage> {
    // pdfjs does not have PDFDocumentProxy type
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return new PdfPage(await this.docProxy.getPage(index + 1));
  }

  public async init(path: string): Promise<void> {
    this.docProxy = await pdfjs.getDocument(path).promise;

    // document orientation bases on first page orientation
    this.orientation = (await this.getPage(0)).orientation;
  }

}
