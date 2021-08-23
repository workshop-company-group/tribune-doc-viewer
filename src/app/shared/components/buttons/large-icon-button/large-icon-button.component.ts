import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-large-icon-button',
  templateUrl: './large-icon-button.component.html',
  styleUrls: ['./large-icon-button.component.scss'],
})
export class LargeIconButtonComponent {

  @Input('src')
  public iconSource: string;

  @Output('button-click')
  public clickEmitter = new EventEmitter<void>();

  constructor() { }

}
