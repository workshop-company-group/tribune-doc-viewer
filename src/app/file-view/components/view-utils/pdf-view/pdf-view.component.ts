import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  Component,
  Input,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { ResizeSensor } from 'css-element-queries';

import { PdfDocument, PdfOrientation } from '../../../models';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfViewComponent implements AfterViewInit {

  @ViewChild('pdfCanvas')
  private readonly canvas: ElementRef<HTMLCanvasElement>;

  @Input()
  public pdf: PdfDocument;

  @Input()
  public orientation: PdfOrientation = 'undefined';

  // page width / page height
  private sideRatio: number;

  private resizeSensor: ResizeSensor;

  @Input()
  private set page(value: number) {
    void this.renderPage(value);
  }

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly el: ElementRef<HTMLElement>,
  ) { }

  public ngAfterViewInit(): void {
    this.resizeSensor = new ResizeSensor(
      this.el.nativeElement, () => this.calculateOrientation(),
    );
  }

  private calculateOrientation(): void {
    if (this.el.nativeElement.offsetWidth /
        this.el.nativeElement.offsetHeight > this.sideRatio) {
      this.orientation = 'horizontal';
    } else {
      this.orientation = 'vertical';
    }
  }

  private async renderPage(index: number): Promise<void> {
    const page = await this.pdf.getPage(index);
    this.sideRatio = page.width / page.height;

    if (this.orientation === 'undefined') {
      this.calculateOrientation();
    }

    await page.renderScaled(this.canvas.nativeElement);
    this.cd.detectChanges();
  }

}
