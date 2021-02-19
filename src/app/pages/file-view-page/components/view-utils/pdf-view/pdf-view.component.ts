import { Component, Input, ElementRef, OnInit, ViewChild } from '@angular/core';

import { PdfService } from '../../../services';
import { PdfDocument } from '../../../models';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent implements OnInit {

  @ViewChild('pdfCanvas')
  private readonly canvas: ElementRef<HTMLCanvasElement>;

  @Input()
  private pdf: PdfDocument;

  @Input()
  private set page(value: number) {
    this.pdf.getPage(value).then((page) =>
      page.renderScaled(this.canvas.nativeElement.width,
                        this.canvas.nativeElement.getContext('2d')));
  }

  constructor() { }

  ngOnInit(): void { }

}
