import { Component, Input } from '@angular/core';

import { OpenedDocument } from '../../../models';

@Component({
  selector: 'app-main-slide',
  templateUrl: './main-slide.component.html',
  styleUrls: ['./main-slide.component.scss']
})
export class MainSlideComponent {

  @Input()
  public readonly doc: OpenedDocument;

  constructor() { }

  public nextSlide(): void {
    this.doc.currentPage.next(this.doc.currentPage.value + 1);
  }

  public previousSlide(): void {
    this.doc.currentPage.next(this.doc.currentPage.value - 1);
  }

}
