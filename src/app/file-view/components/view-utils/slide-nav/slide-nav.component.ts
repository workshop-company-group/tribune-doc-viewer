import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { RecordOf } from 'immutable';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { OpenedDocument } from '../../../models';
import { PdfService } from '../../../services';

@Component({
  selector: 'app-slide-nav',
  templateUrl: './slide-nav.component.html',
  styleUrls: ['./slide-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideNavComponent {

  @Input()
  public set doc(value: RecordOf<OpenedDocument>) {
    this.documentObservable.next(value);

    const pageNumber = this.doc.pdf ? this.doc.pdf.numPages : 0;
    this.pageIterable = new Array<number>(pageNumber);
  }

  public readonly documentObservable =
  new BehaviorSubject<RecordOf<OpenedDocument> | undefined>(undefined);

  public readonly documentOrientation = this.documentObservable.pipe(
    filter(doc => !!doc?.pdf),
    switchMap((doc: RecordOf<OpenedDocument>) =>
      this.pdfUtils.getOrientation(doc.pdf as PDFDocumentProxy)),
  );

  @Input()
  public wrap = false;

  public pageIterable: number[];

  constructor(
    private readonly pdfUtils: PdfService,
  ) { }

}
