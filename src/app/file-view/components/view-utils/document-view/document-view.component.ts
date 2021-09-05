import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';

import { RecordOf } from 'immutable';

import { OpenedDocument } from '../../../models';

const HALF_SCREEN_WIDTH_RATIO = 0.6;

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentViewComponent {

  @Input()
  public doc: RecordOf<OpenedDocument>;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
  ) { }

  public isHalfScreen(): boolean {
    return this.el.nativeElement.offsetWidth /
           window.innerWidth < HALF_SCREEN_WIDTH_RATIO;
  }

}
