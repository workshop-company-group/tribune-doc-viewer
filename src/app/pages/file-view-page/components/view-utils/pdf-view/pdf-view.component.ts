import { AfterViewInit, Component, Input, ElementRef, ViewChild } from '@angular/core';

import { ResizeSensor } from 'css-element-queries';

import { PdfService } from '../../../services';
import { PdfDocument,
         PdfOrientation } from '../../../models';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent implements AfterViewInit {

  @ViewChild('pdfCanvas')
  private readonly canvas: ElementRef<HTMLCanvasElement>;

  @Input()
  private readonly pdf: PdfDocument;

  @Input()
  public orientation: PdfOrientation = 'undefined';

  // page width / page height
  private sideRatio: number;

  @Input()
  private set page(value: number) {
    this.pdf.getPage(value).then((page) => {
      this.sideRatio = page.width / page.height;

      if (this.orientation === 'undefined') {
        this.calculateOrientation();
      }

      page.renderScaled(this.canvas.nativeElement.width,
                        this.canvas.nativeElement.getContext('2d'));
    });
  }

  constructor(
    private el: ElementRef,
  ) { }

  ngAfterViewInit(): void { 
    const sensor = new ResizeSensor(this.el.nativeElement, 
      () => this.calculateOrientation());
  }

  private calculateOrientation(): void {
    if (this.el.nativeElement.offsetWidth / 
        this.el.nativeElement.offsetHeight > this.sideRatio) {
      this.orientation = 'horizontal';
    } else {
      this.orientation = 'vertical';
    }
  }

}
