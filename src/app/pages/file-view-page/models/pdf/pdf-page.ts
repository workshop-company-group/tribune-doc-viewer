// wrapper for PDFPageProxy class from pdf.js
export class PdfPage {

  // TODO: make private
  public pageProxy; // typeof pageProxy === PDFPageProxy

  constructor(pageProxy) {
    this.pageProxy = pageProxy;
  }

  public async render(canvasContext: CanvasRenderingContext2D): Promise<void> {
    await this.pageProxy.render({ canvasContext });
  }

  public async renderScaled(width: number,
                            canvasContext: CanvasRenderingContext2D): Promise<void> {
    const currentViewport = this.pageProxy.getViewport({ scale: 1, });

    const scale = width / currentViewport.width;
    const viewport = this.pageProxy.getViewport({ scale });

    await this.pageProxy.render({ canvasContext, viewport }); 
  }

}
