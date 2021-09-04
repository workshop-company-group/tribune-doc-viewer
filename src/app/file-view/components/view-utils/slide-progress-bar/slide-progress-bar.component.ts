import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RecordOf } from 'immutable';

import { OpenedDocument } from '../../../models';

@Component({
  selector: 'app-slide-progress-bar',
  templateUrl: './slide-progress-bar.component.html',
  styleUrls: ['./slide-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideProgressBarComponent {

  @Input()
  public doc: RecordOf<OpenedDocument>;

  constructor() { }

}
