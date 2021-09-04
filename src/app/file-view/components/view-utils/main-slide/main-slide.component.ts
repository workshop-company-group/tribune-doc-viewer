import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecordOf } from 'immutable';

import { OpenedDocument } from '../../../models';

@Component({
  selector: 'app-main-slide',
  templateUrl: './main-slide.component.html',
  styleUrls: ['./main-slide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSlideComponent implements OnInit {

  @Input()
  public doc: RecordOf<OpenedDocument>;

  public firstPage: Observable<boolean>;

  public lastPage: Observable<boolean>;

  constructor() { }

  public ngOnInit(): void {
    this.firstPage = this.doc.currentPage.pipe(
      map(page => page <= 0),
    );
    this.lastPage = this.doc.currentPage.pipe(
      map(page => page >= this.doc.pdf.numPages - 1),
    );
  }

  public nextSlide(): void {
    this.doc.currentPage.next(this.doc.currentPage.value + 1);
  }

  public previousSlide(): void {
    this.doc.currentPage.next(this.doc.currentPage.value - 1);
  }

}
