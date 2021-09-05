import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { RecordOf } from 'immutable';

import { OpenedDocument } from '../../../models';

@Component({
  selector: 'app-slide-nav',
  templateUrl: './slide-nav.component.html',
  styleUrls: ['./slide-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideNavComponent implements OnInit {

  @Input()
  public doc: RecordOf<OpenedDocument>;

  @Input()
  public wrap = false;

  public pageIterable: number[];

  constructor() { }

  public ngOnInit(): void {
    this.pageIterable = new Array<number>(this.doc.pdf.numPages);
  }

}
