import { PDFPageProxy } from 'pdfjs-dist';
import { PdfOrientation } from './pdf-orientation';

const VIEW_MAX_X_INDEX = 2;
const VIEW_MAX_Y_INDEX = 3;

// wrapper for PDFPageProxy class from pdf.js
export class PdfPage {

  private readonly pageProxy: PDFPageProxy;

  public orientation: PdfOrientation;

  constructor(pageProxy: PDFPageProxy) {
    this.pageProxy = pageProxy;

    if (this.height > this.width) {
      this.orientation = 'vertical';
    } else {
      this.orientation = 'horizontal';
    }
  }

  public get width(): number {
    return this.pageProxy.view[VIEW_MAX_X_INDEX];
  }

  public get height(): number {
    return this.pageProxy.view[VIEW_MAX_Y_INDEX];
  }

  public render(
    canvasContext: CanvasRenderingContext2D,
  ): Promise<PDFPageProxy> {
    return this.pageProxy.render({
      canvasContext,
      viewport: this.pageProxy.getViewport({ scale: 1 }),
    }).promise;
  }

  public renderScaled(canvas: HTMLCanvasElement): Promise<PDFPageProxy> {
    const currentViewport = this.pageProxy.getViewport({ scale: 1 });

    const scale = canvas.width / currentViewport.width;
    const viewport = this.pageProxy.getViewport({ scale });

    canvas.height = viewport.height;

    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) {
      throw new Error('Cannot render page. Canvas context is null.');
    }
    return this.pageProxy.render({
      canvasContext: canvasContext,
      viewport,
    }).promise;
  }

}
