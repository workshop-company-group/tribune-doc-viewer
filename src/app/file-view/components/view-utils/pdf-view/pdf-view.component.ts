import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  Component,
  Input,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { ResizeSensor } from 'css-element-queries';
import { PDFPageProxy } from 'pdfjs-dist';
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { PdfOrientation } from '../../../models';
import { PdfService } from '../../../services';
import { isNotNil } from '../../../../shared/utils';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfViewComponent implements AfterViewInit, OnDestroy {

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly pdfUtils: PdfService,
    private readonly el: ElementRef<HTMLElement>,
  ) {
    this.subscriptions.push(
      this.subscribePageRender(),
    );
  }

  public ngAfterViewInit(): void {
    this.resizeSensor = new ResizeSensor(
      this.el.nativeElement, () => this.calculateOrientation(),
    );
    this.viewWasInit.next();
    this.viewWasInit.complete();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private readonly subscriptions: Subscription[] = [];


  // #region HTML Canvas

  @ViewChild('pdfCanvas')
  private readonly canvas: ElementRef<HTMLCanvasElement>;

  private readonly viewWasInit = new Subject<void>();

  private resizeSensor: ResizeSensor;

  // #endregion


  // #region PDF page

  @Input()
  private set page(page: PDFPageProxy) {
    this.pageObservable.next(page);
  }

  private readonly pageObservable =
  new BehaviorSubject<PDFPageProxy | null>(null);

  /**
   * Side ratio of the page. Calculated as width / height.
   */
  private sideRatio: number;

  @Input()
  public orientation: PdfOrientation = 'undefined';

  private calculateOrientation(): void {
    if (this.el.nativeElement.offsetWidth /
        this.el.nativeElement.offsetHeight > this.sideRatio) {
      this.orientation = 'horizontal';
    } else {
      this.orientation = 'vertical';
    }
  }

  // #endregion


  // #region Page rendering

  private subscribePageRender(): Subscription {
    return combineLatest([
      this.pageObservable.pipe(filter(isNotNil)),
      this.viewWasInit,
    ]).subscribe(([page]) => void this.renderPage(page));
  }

  private async renderPage(page: PDFPageProxy): Promise<void> {
    this.sideRatio = this.pdfUtils.getPageWidth(page)
    / this.pdfUtils.getPageHeight(page);

    if (this.orientation === 'undefined') {
      this.calculateOrientation();
    }

    await this.renderScaled(page);
    this.cd.detectChanges();
  }

  private async renderScaled(page: PDFPageProxy): Promise<void> {
    const currentViewport = page.getViewport({ scale: 1 });
    const canvas = this.canvas.nativeElement;

    const scale = canvas.width / currentViewport.width;
    const viewport = page.getViewport({ scale });

    canvas.height = viewport.height;

    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) {
      throw new Error('Cannot render page. Canvas context is null.');
    }

    await page.render({
      canvasContext: canvasContext,
      viewport,
    }).promise;
  }

  // #endregion

}
