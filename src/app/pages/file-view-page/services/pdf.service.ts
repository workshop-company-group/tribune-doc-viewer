import { Injectable } from '@angular/core';

import { PdfDocument } from '../models';

import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = 
  require('!!file-loader!pdfjs-dist/build/pdf.worker.min.js').default;

@Injectable({
  providedIn: 'root'
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
