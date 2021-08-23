import { Component, Input, OnInit } from '@angular/core';

import { OpenedDocument } from '../../../models';

@Component({
  selector: 'app-slide-nav',
  templateUrl: './slide-nav.component.html',
  styleUrls: ['./slide-nav.component.scss'],
})
export class SlideNavComponent implements OnInit {

  @Input()
  public readonly doc: OpenedDocument;

  @Input()
  public readonly wrap: boolean = false;

  public pageIterable;

  constructor() { }

  public ngOnInit(): void {
    this.pageIterable = new Array(this.doc.pdf.numPages);
  }

}
