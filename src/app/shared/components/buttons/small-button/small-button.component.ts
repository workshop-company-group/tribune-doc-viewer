import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-small-button',
  templateUrl: './small-button.component.html',
  styleUrls: ['./small-button.component.scss']
})
export class SmallButtonComponent {

  @Input()
  public readonly disabled = false;

  @Output('button-click')
  public readonly clickEmitter = new EventEmitter<void>();

  constructor() { }

}
