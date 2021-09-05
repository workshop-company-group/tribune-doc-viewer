import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PdfDocument } from '../../../models';

@Component({
  selector: 'app-slide-thumbnail',
  templateUrl: './slide-thumbnail.component.html',
  styleUrls: ['./slide-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideThumbnailComponent {

  @Input()
  public pdf: PdfDocument;

  @Input()
  public page: number;

  @Input()
  public selected = false;

  constructor() { }

}
