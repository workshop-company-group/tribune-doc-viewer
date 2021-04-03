import { Component, Input, } from '@angular/core';

import { OpenedDocument } from '../../../models';

@Component({
  selector: 'app-slide-progress-bar',
  templateUrl: './slide-progress-bar.component.html',
  styleUrls: ['./slide-progress-bar.component.scss']
})
export class SlideProgressBarComponent {

  @Input()
  public readonly doc: OpenedDocument;

  constructor() { }

}
