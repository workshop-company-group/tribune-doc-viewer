import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-small-button',
  templateUrl: './small-button.component.html',
  styleUrls: ['./small-button.component.scss']
})
export class SmallButtonComponent {

  @Output('button-click')
  public readonly clickEmitter = new EventEmitter<void>();

  constructor() { }

}
