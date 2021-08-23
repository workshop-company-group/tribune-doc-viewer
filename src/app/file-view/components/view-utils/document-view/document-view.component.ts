import { Component, ElementRef, Input } from '@angular/core';

import { OpenedDocument } from '../../../models';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent {

  @Input()
  public readonly doc: OpenedDocument;

  constructor(
    private readonly el: ElementRef,
  ) { }

  public isHalfScreen(): boolean {
    return this.el.nativeElement.offsetWidth /
           window.innerWidth < 0.6;
  }

}
