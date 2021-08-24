import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {

  @Input('src')
  public iconSource: string;

  @Input()
  public readonly disabled = false;

  @Output('button-click')
  public clickEmitter = new EventEmitter<void>();

  constructor() { }

}
