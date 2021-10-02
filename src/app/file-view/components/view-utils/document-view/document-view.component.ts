import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';

import { RecordOf } from 'immutable';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { OpenedDocument } from '../../../models';
import { PdfService } from '../../../services';

const HALF_SCREEN_WIDTH_RATIO = 0.6;

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentViewComponent {

  @Input()
  public set doc(value: RecordOf<OpenedDocument>) {
    this.documentObservable.next(value);
  }

  public readonly documentObservable =
  new BehaviorSubject<RecordOf<OpenedDocument> | undefined>(undefined);

  public readonly documentOrientation = this.documentObservable.pipe(
    filter(doc => !!doc?.pdf),
    switchMap((doc: RecordOf<OpenedDocument>) =>
      this.pdfUtils.getOrientation(doc.pdf as PDFDocumentProxy)),
  );

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly pdfUtils: PdfService,
  ) { }

  public isHalfScreen(): boolean {
    return this.el.nativeElement.offsetWidth /
           window.innerWidth < HALF_SCREEN_WIDTH_RATIO;
  }

}
