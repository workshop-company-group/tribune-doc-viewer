import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { OpenedDocument } from '../../../models';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent implements OnInit {

  @Input()
  public readonly doc: OpenedDocument;

  constructor(
    private el: ElementRef,
  ) { }

  ngOnInit(): void { }

  public isHalfScreen(): boolean {
    return this.el.nativeElement.offsetWidth / 
           window.innerWidth < 0.6;
  }

}
