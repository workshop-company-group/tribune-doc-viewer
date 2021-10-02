import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { RecordOf } from 'immutable';
import { BehaviorSubject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { OpenedDocument } from '../../../models';
import { PdfService } from '../../../services';
import { isNotNil } from '../../../../shared/utils';

@Component({
  selector: 'app-slide-nav',
  templateUrl: './slide-nav.component.html',
  styleUrls: ['./slide-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideNavComponent {

  constructor(
    private readonly pdfUtils: PdfService,
  ) { }

  @Input()
  public set doc(value: RecordOf<OpenedDocument>) {
    this.documentObservable.next(value);

    if (!value.pdf) {
      throw new Error('Invalid document: pdf is undefined');
    }
    this.pageIterable = new Array<number>(value.pdf.numPages);
  }

  public readonly documentObservable =
  new BehaviorSubject<RecordOf<OpenedDocument> | null>(null);

  public readonly documentOrientation = this.documentObservable.pipe(
    filter(isNotNil),
    map(doc => doc.pdf),
    filter(isNotNil),
    switchMap(pdf => this.pdfUtils.getOrientation(pdf)),
  );

  @Input()
  public wrap = false;

  public pageIterable: number[];

}
