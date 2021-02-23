import { PdfOrientation } from './pdf-orientation';

// wrapper for PDFPageProxy class from pdf.js
export class PdfPage {

  private pageProxy; // typeof pageProxy === PDFPageProxy

  public orientation: PdfOrientation;

  constructor(pageProxy) {
    this.pageProxy = pageProxy;

    if (this.height > this.width) {
      this.orientation = 'vertical';
    } else {
      this.orientation = 'horizontal';
    }
  }

  public get width(): number {
    return this.pageProxy.view[2];
  }

  public get height(): number {
    return this.pageProxy.view[3];
  }

  public async render(canvasContext: CanvasRenderingContext2D): Promise<void> {
    await this.pageProxy.render({
      canvasContext,
      viewport: this.pageProxy.getViewport({ scale: 1, })
    });
  }

  public async renderScaled(canvas: HTMLCanvasElement): Promise<void> {
    const currentViewport = this.pageProxy.getViewport({ scale: 1, });

    const scale = canvas.width / currentViewport.width;
    const viewport = this.pageProxy.getViewport({ scale });

    canvas.height = viewport.height;

    await this.pageProxy.render({
      canvasContext: canvas.getContext('2d'),
      viewport
    });
  }

}
