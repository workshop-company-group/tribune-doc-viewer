import { Injectable } from '@angular/core';

import {
  getDocument,
  GlobalWorkerOptions,
  PDFDocumentProxy,
  PDFPageProxy,
} from 'pdfjs-dist';

import { PdfOrientation } from '../models';

// Very hard to set worker in pdfjs, only this way works
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
GlobalWorkerOptions.workerSrc =
// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  require('!!file-loader!pdfjs-dist/build/pdf.worker.min.js').default;

const VIEW_MAX_X_INDEX = 2;
const VIEW_MAX_Y_INDEX = 3;

@Injectable({
  providedIn: 'root',
})
export class PdfService {

  constructor() { }

  // loads .pdf file into drawable format
  public async loadPdf(path: string): Promise<PDFDocumentProxy> {
    return getDocument(path).promise;
  }

  public async getOrientation(
    doc: PDFDocumentProxy,
  ): Promise<PdfOrientation> {
    const firstPage = await doc.getPage(1);
    const pageSize = {
      height: this.getPageHeight(firstPage),
      width: this.getPageWidth(firstPage),
    };
    return pageSize.height > pageSize.width ? 'vertical' : 'horizontal';
  }

  public getPageHeight(page: PDFPageProxy): number {
    return page.view[VIEW_MAX_Y_INDEX];
  }

  public getPageWidth(page: PDFPageProxy): number {
    return page.view[VIEW_MAX_X_INDEX];
  }

}
