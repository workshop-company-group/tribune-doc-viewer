import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-slide-button',
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss']
})
export class SlideButtonComponent {

  @Output('slide-click')
  public readonly clickEmitter = new EventEmitter<void>();

  @Input()
  public readonly disabled: boolean = false;

  @Input('icon')
  public readonly iconSrc: string;

  constructor() { }

}
