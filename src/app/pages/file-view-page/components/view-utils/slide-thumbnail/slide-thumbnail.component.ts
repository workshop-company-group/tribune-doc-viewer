import { Component, Input, OnInit } from '@angular/core';

import { PdfDocument } from '../../../models';

@Component({
  selector: 'app-slide-thumbnail',
  templateUrl: './slide-thumbnail.component.html',
  styleUrls: ['./slide-thumbnail.component.scss']
})
export class SlideThumbnailComponent implements OnInit {

  @Input()
  public readonly doc: PdfDocument;

  @Input()
  public readonly page: number;

  @Input()
  public readonly selected: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
