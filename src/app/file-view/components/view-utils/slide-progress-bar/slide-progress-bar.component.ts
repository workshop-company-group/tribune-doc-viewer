import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { RecordOf } from 'immutable';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OpenedDocument } from '../../../models';

@Component({
  selector: 'app-slide-progress-bar',
  templateUrl: './slide-progress-bar.component.html',
  styleUrls: ['./slide-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideProgressBarComponent implements OnInit {

  @Input()
  public doc: RecordOf<OpenedDocument>;

  public displayedPage: Observable<number>;

  constructor() { }

  public ngOnInit(): void {
    this.displayedPage = this.doc.currentPage.pipe(
      map(page => page + 1),
    );
  }

}
