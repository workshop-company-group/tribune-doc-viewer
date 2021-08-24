import { Injectable } from '@angular/core';

import { PdfDocument } from '../models';

import * as pdfjs from 'pdfjs-dist';

// Very hard to set worker in pdfjs, only this way works
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
pdfjs.GlobalWorkerOptions.workerSrc =
// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  require('!!file-loader!pdfjs-dist/build/pdf.worker.min.js').default;

@Injectable({
  providedIn: 'root',
})
export class PdfService {

  constructor() { }

  // loads .pdf file into drawable format
  public async loadPdf(path: string): Promise<PdfDocument> {
    const doc = new PdfDocument();
    await doc.init(path);

    return doc;
  }

}
