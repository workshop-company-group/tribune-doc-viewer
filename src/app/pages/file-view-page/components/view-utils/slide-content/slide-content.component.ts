import { Component, Input, OnInit } from '@angular/core';

import { PdfDocument } from '../../../models';

@Component({
  selector: 'app-slide-content',
  templateUrl: './slide-content.component.html',
  styleUrls: ['./slide-content.component.scss']
})
export class SlideContentComponent implements OnInit {

  @Input()
  public readonly pdf: PdfDocument;

  @Input()
  public readonly page: number;

  constructor() { }

  ngOnInit(): void {
  }

}
