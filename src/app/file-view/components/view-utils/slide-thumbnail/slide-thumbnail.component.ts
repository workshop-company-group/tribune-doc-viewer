import { Component, Input } from '@angular/core';

import { PdfDocument } from '../../../models';

@Component({
  selector: 'app-slide-thumbnail',
  templateUrl: './slide-thumbnail.component.html',
  styleUrls: ['./slide-thumbnail.component.scss']
})
export class SlideThumbnailComponent {

  @Input()
  public readonly pdf: PdfDocument;

  @Input()
  public readonly page: number;

  @Input()
  public readonly selected: boolean = false;

  constructor() { }

}
