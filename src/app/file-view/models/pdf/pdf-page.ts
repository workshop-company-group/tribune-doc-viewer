import { PdfOrientation } from './pdf-orientation';

const VIEW_MAX_X_INDEX = 2;
const VIEW_MAX_Y_INDEX = 3;

// wrapper for PDFPageProxy class from pdf.js
export class PdfPage {

  // pdfjs does not have PDFPageProxy type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly pageProxy: any; // typeof pageProxy === PDFPageProxy

  public orientation: PdfOrientation;

  // pdfjs does not have PDFPageProxy type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(pageProxy: any) {
    // pdfjs does not have PDFPageProxy type
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.pageProxy = pageProxy;

    if (this.height > this.width) {
      this.orientation = 'vertical';
    } else {
      this.orientation = 'horizontal';
    }
  }

  public get width(): number {
    // pdfjs does not have PDFPageProxy type
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    return this.pageProxy.view[VIEW_MAX_X_INDEX];
  }

  public get height(): number {
    // pdfjs does not have PDFPageProxy type
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    return this.pageProxy.view[VIEW_MAX_Y_INDEX];
  }

  public async render(canvasContext: CanvasRenderingContext2D): Promise<void> {
    // pdfjs does not have PDFPageProxy type
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await this.pageProxy.render({
      canvasContext,
      // pdfjs does not have PDFPageProxy type
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      viewport: this.pageProxy.getViewport({ scale: 1 }),
    });
  }

  public async renderScaled(canvas: HTMLCanvasElement): Promise<void> {
    // pdfjs does not have PDFPageProxy type
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const currentViewport = this.pageProxy.getViewport({ scale: 1 });

    // pdfjs does not have PDFPageProxy type
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const scale = canvas.width / currentViewport.width;
    // pdfjs does not have PDFPageProxy type
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const viewport = this.pageProxy.getViewport({ scale });

    // pdfjs does not have PDFPageProxy type
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    canvas.height = viewport.height;

    // pdfjs does not have PDFPageProxy type
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await this.pageProxy.render({
      canvasContext: canvas.getContext('2d'),
      // pdfjs does not have PDFPageProxy type
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      viewport,
    });
  }

}
