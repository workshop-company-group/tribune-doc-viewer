import * as pdfjs from 'pdfjs-dist';

import { PdfPage } from './pdf-page';
import { PdfOrientation } from './pdf-orientation';

// wrapper for PDFDocumentProxy class from pdf.js
export class PdfDocument {

  private docProxy: pdfjs.PDFDocumentProxy;

  public orientation: PdfOrientation;

  constructor() {}

  public get numPages(): number {
    return this.docProxy.numPages;
  }

  // index of first page is 0
  public async getPage(index: number): Promise<PdfPage> {
    return new PdfPage(await this.docProxy.getPage(index + 1));
  }

  public async init(path: string): Promise<void> {
    this.docProxy = await pdfjs.getDocument(path).promise;

    // document orientation bases on first page orientation
    this.orientation = (await this.getPage(0)).orientation;
  }

}
