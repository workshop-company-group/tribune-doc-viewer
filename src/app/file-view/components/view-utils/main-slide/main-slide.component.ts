import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { RecordOf } from 'immutable';

import { OpenedDocument } from '../../../models';
import { isNotNil } from '../../../../shared/utils';

@Component({
  selector: 'app-main-slide',
  templateUrl: './main-slide.component.html',
  styleUrls: ['./main-slide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSlideComponent {

  constructor() { }


  // #region Document

  @Input()
  public set doc(doc: RecordOf<OpenedDocument> | null) {
    if (doc) {
      this.validateDocument(doc);
    }
    this.documentObservable.next(doc);
  }

  public get doc(): RecordOf<OpenedDocument> | null {
    return this.documentObservable.value;
  }

  public readonly documentObservable =
  new BehaviorSubject<RecordOf<OpenedDocument> | null>(null);

  private readonly pdf = this.documentObservable.pipe(
    filter(isNotNil),
    map(doc => doc.pdf),
    filter(isNotNil),
  );

  private validateDocument(doc: OpenedDocument): void {
    if (!doc.pdf) {
      throw new Error('Invalid document: PDF is undefined');
    }
  }

  // #endregion


  // #region Current document page

  private readonly currentPageIndex = this.documentObservable.pipe(
    filter(isNotNil),
    switchMap(doc => doc.currentPage),
  );

  public readonly currentPage = combineLatest([
    this.pdf,
    this.currentPageIndex,
  ]).pipe(
    switchMap(([pdf, pageIndex]) => pdf.getPage(pageIndex + 1)),
  );

  public isFirstPage = this.currentPageIndex.pipe(
    map(pageIndex => pageIndex <= 0),
  );

  public isLastPage = combineLatest([
    this.currentPageIndex,
    this.pdf,
  ]).pipe(
    map(([pageIndex, pdf]) => pageIndex >= pdf.numPages - 1),
  );

  // #endregion


  // #region Document controls API

  public switchPageToNext(): void {
    if (!this.doc) {
      throw new Error('Cannot switch to next page: document is null');
    }
    this.doc.currentPage.next(this.doc.currentPage.value + 1);
  }

  public switchPageToPrevious(): void {
    if (!this.doc) {
      throw new Error('Cannot switch to previous page: document is null');
    }
    this.doc.currentPage.next(this.doc.currentPage.value - 1);
  }

  // #endregion

}
