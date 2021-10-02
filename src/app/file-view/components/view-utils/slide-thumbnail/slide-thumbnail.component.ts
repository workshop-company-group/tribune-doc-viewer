import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RecordOf } from 'immutable';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { isNotNil } from '../../../../shared/utils';
import { PdfService } from '../../../services';

@Component({
  selector: 'app-slide-thumbnail',
  templateUrl: './slide-thumbnail.component.html',
  styleUrls: ['./slide-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideThumbnailComponent {

  constructor(
    private readonly pdfUtils: PdfService,
  ) { }


  // #region PDF document

  @Input()
  public set pdf(doc: RecordOf<PDFDocumentProxy>) {
    this.pdfObservable.next(doc);
  }

  public readonly pdfObservable =
  new BehaviorSubject<PDFDocumentProxy | null>(null);

  public readonly pdfOrientation = this.pdfObservable.pipe(
    filter(isNotNil),
    switchMap(pdf => this.pdfUtils.getOrientation(pdf)),
  );

  // #endregion


  // #region PDF document page

  @Input()
  public set pageIndex(index: number) {
    this.pageIndexObservable.next(index);
  }

  public readonly pageIndexObservable =
  new BehaviorSubject<number | null>(null);

  public readonly pdfPage = combineLatest([
    this.pdfObservable.pipe(filter(isNotNil)),
    this.pageIndexObservable.pipe(filter(isNotNil)),
  ]).pipe(
    switchMap(([pdf, pageIndex]) => pdf.getPage(pageIndex + 1)),
  );

  @Input()
  public selected = false;

  // #endregion

}
